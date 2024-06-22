import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../db/entities/user.entity';
import { Repository } from 'typeorm';
import { ethers } from 'ethers';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomEntity } from '../../../db/entities/room.entity';
import { v4 as uuidv4 } from 'uuid';
import { RoomStatus } from '../api/enums';
import {
  ICreateLobbyReq,
  ICreateLobbyRes,
  IJoinRoomReq,
  IJoinRoomRes,
  IRabbitsSetReq,
  IUserMoveReq,
} from './interfaces';
import { getBattleshipContract } from '../../shared/utils/getBattleshipContract';
import fs from 'fs';
import * as path from 'path';

const createWC = require('../../../assets/circom/create/create_js/witness_calculator.js');
const createWasm = path.resolve(__dirname, '../../assets/circom/create/create_js/create.wasm');
const createZkey = path.resolve(__dirname, '../../../assets/circom/create/create_0001.zkey');
const moveWC = require('../../../assets/circom/move/move_js/witness_calculator.js');
const moveWasm = path.resolve(__dirname, '../../../assets/circom/move/move_js/move.wasm');
const moveZkey = path.resolve(__dirname, '../../../assets/circom/move/move_0001.zkey');
const snarkjs = require('snarkjs');
const bigInt = require('big-integer');
const WITNESS_FILE = '/tmp/witness';
const emptyProof = '0x0000000000000000000000000000000000000000000000000000000000000000';

@Injectable()
@WebSocketGateway({ cors: { origin: '*' } })
export class GatewayService implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(GatewayService.name);
  private readonly url = `https://scroll-sepolia.blockpi.network/v1/rpc/64e6310d6e6234d8d05d9afcdc60a5ddab5a05a9`;
  private provider: ethers.providers.JsonRpcProvider;
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @SubscribeMessage('createLobby')
  public async handleCreateLobby(client: Socket, body: ICreateLobbyReq) {
    const user = await this.userRepository.findOne({
      where: { telegramUserId: body.telegramUserId },
    });
    const roomEntity = this.roomRepository.create({
      roomId: uuidv4(),
      status: RoomStatus.Active,
      userId: user.id,
      bet: body.bet,
    });
    await this.roomRepository.save(roomEntity);

    client.join(roomEntity.roomId);

    //this.server.to(roomEntity.roomId).emit('roomCreated', { roomId: roomEntity.roomId });
    //1. Bet
    //2.Username
    const res: ICreateLobbyRes = { bet: body.bet, roomId: roomEntity.roomId };
    this.server.emit(`roomCreated:${body.telegramUserId}`, res);
  }

  @SubscribeMessage('joinRoom')
  public async handleJoinRoom(client: Socket, body: IJoinRoomReq) {
    console.log(`${body.telegramUserId} joined room: ${body.roomId}`);
    const roomEntity = await this.roomRepository.findOne({
      where: { roomId: body.roomId },
      relations: { user: true },
    });
    client.join(roomEntity.roomId);

    await this.roomRepository.update(roomEntity.id, { status: RoomStatus.Game });

    //1. Bet
    //2.Username both
    //3.RoomId
    const res: IJoinRoomRes = {
      bet: roomEntity.bet,
      roomId: roomEntity.roomId,
      opponentName: roomEntity.user.username,
    };
    this.server.emit(`readyForBattle:${roomEntity.roomId}`, res);
  }

  @SubscribeMessage('clientRabbitsSet')
  public async handleRabbitSet(client: Socket, body: IRabbitsSetReq) {
    //check is create room creator
    //contract call
    //await tx
    //update room contract id
    //send tx confirmed
    //isGameStart user not creator
    const roomEntity = await this.roomRepository.findOne({
      where: { roomId: body.roomId },
    });
    const userEntity = await this.userRepository.findOne({
      where: { telegramUserId: body.telegramUserId },
      relations: { wallets: true },
    });
    const isRoomCreator = roomEntity.user.telegramUserId === body.telegramUserId;
    const rabbit1 = body.rabbits[0];
    const rabbit2 = body.rabbits[1];
    const playerCreate = {
      nonce: userEntity.nonce,
      ships: [
        [rabbit1.x, rabbit1.y],
        [rabbit2.x, rabbit2.y],
      ],
    };
    const proof = await this.genCreateProof(playerCreate);
    const signer = new ethers.Wallet(userEntity.wallets[0].privateKey, this.provider);
    const contract = getBattleshipContract(signer);

    if (isRoomCreator) {
      const createGame = await contract.createGame(proof.solidityProof, proof.inputs[0]);
      await createGame.wait();
      let contractRoomId = 0;
      if (createGame.events) {
        createGame.events.forEach((event) => {
          console.log('Event:', event.event, event.args);
          contractRoomId = event.args[0];
        });
      }
      await this.roomRepository.update(roomEntity.id, { contractRoomId });
    } else {
      const createGame = await contract.joinGame(
        roomEntity.contractRoomId,
        proof.solidityProof,
        proof.inputs[0],
      );
      await createGame.wait();
    }
    const res = {
      contractRoomId: roomEntity.contractRoomId,
    };
    this.server.emit(`serverRabbitSet:${body.roomId}:${body.telegramUserId}`, res);

    if (isRoomCreator) {
      this.server.emit(`gameStarted:${body.roomId}:${body.telegramUserId}`);
    }
  }

  @SubscribeMessage('clientUserMove')
  public async handleUserMove(client: Socket, body: IUserMoveReq) {
    //contract call to get last move
    //check is last move compare to rabbits of current user (true/false)
    //contract call to move
    //await tx
    //contract call getGame. If winner, call
    const userEntity = await this.userRepository.findOne({
      where: { telegramUserId: body.telegramUserId },
      relations: { wallets: true },
    });
    const roomEntity = await this.roomRepository.findOne({
      where: { roomId: body.roomId },
      relations: { user: true },
    });
    const signer = new ethers.Wallet(userEntity.wallets[0].privateKey, this.provider);
    const contract = getBattleshipContract(signer);
    const game = await contract.game(roomEntity.contractRoomId);

    if (game.winner !== ethers.constants.AddressZero) {
      this.server.emit(`winner:${body.roomId}`, { address: game.winner });

      return;
    }

    if (!game.moves.length) {
      const move = await contract.submitMove(
        roomEntity.contractRoomId,
        body.coordinates.x,
        body.coordinates.y,
        emptyProof,
        false,
      );
      await move.wait();

      this.server.emit(`serverUserMove:${body.roomId}:${body.telegramUserId}`, { lastMove: null });
    } else {
      const rabbit1 = body.userRabbits[0];
      const rabbit2 = body.userRabbits[1];
      const proof = await this.genMoveProof({
        // Public Inputs
        boardHash: game.player2Hash.toString(),
        guess: [game.moves[game.moves.length - 1].x, game.moves[game.moves.length - 1].y],
        // Private Inputs:
        nonce: userEntity.nonce,
        ships: [
          [rabbit1.x, rabbit1.y],
          [rabbit2.x, rabbit2.y],
        ],
      });

      const move = await contract.submitMove(
        roomEntity.contractRoomId,
        body.coordinates.x,
        body.coordinates.y,
        proof,
        game.moves[game.moves.length - 1].isHit,
      );
      await move.wait();
      this.server.emit(`serverUserMove:${body.roomId}:${body.telegramUserId}`, {
        lastMove: game.moves[game.moves.length - 1].isHit,
      });
    }
  }

  public handleConnection(socket: Socket): void {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  // it will be handled when a client disconnects from the server
  public handleDisconnect(socket: Socket): void {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }

  private async genCreateProof(input: any) {
    const buffer = fs.readFileSync(createWasm);
    const witnessCalculator = await createWC(buffer);
    const buff = await witnessCalculator.calculateWTNSBin(input);
    // The package methods read from files only, so we just shove it in /tmp/ and hope
    // there is no parallel execution.
    fs.writeFileSync(WITNESS_FILE, buff);
    const { proof, publicSignals } = await snarkjs.groth16.prove(createZkey, WITNESS_FILE);
    const solidityProof = this.proofToSolidityInput(proof);

    return {
      solidityProof: solidityProof,
      inputs: publicSignals,
    };
  }

  private proofToSolidityInput(proof: any): string {
    const proofs: string[] = [
      proof.pi_a[0],
      proof.pi_a[1],
      proof.pi_b[0][1],
      proof.pi_b[0][0],
      proof.pi_b[1][1],
      proof.pi_b[1][0],
      proof.pi_c[0],
      proof.pi_c[1],
    ];
    const flatProofs = proofs.map((p) => bigInt(p));

    return '0x' + flatProofs.map((x) => this.toHex32(x)).join('');
  }

  private toHex32(num: number) {
    let str = num.toString(16);
    while (str.length < 64) {
      str = '0' + str;
    }

    return str;
  }

  private async genMoveProof(input: any) {
    const buffer = fs.readFileSync(moveWasm);
    const witnessCalculator = await moveWC(buffer);
    const buff = await witnessCalculator.calculateWTNSBin(input);
    fs.writeFileSync(WITNESS_FILE, buff);
    const { proof, publicSignals } = await snarkjs.groth16.prove(moveZkey, WITNESS_FILE);
    const solidityProof = this.proofToSolidityInput(proof);

    return {
      solidityProof: solidityProof,
      inputs: publicSignals,
    };
  }
}
