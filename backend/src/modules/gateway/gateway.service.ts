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
} from './interfaces';
import { getBattleshipContract } from '../../shared/utils/getBattleshipContract';
import fs from 'fs';

const createWC = require('../../../assets/circom/create/create_js/witness_calculator.js');
const createWasm = '../../../assets/circom/create/create_js/create.wasm';
const createZkey = '../../../assets/circom/create/create_0001.zkey';
const snarkjs = require('snarkjs');
const bigInt = require('big-integer');
const WITNESS_FILE = '/tmp/witness';

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
      relations: { user: true },
    });
    const isRoomCreator = roomEntity.user.telegramUserId === body.telegramUserId;
    if (isRoomCreator) {
      const playerCreate = {
        nonce: 12345,
        ships: [
          [2, 2, 0],
          [4, 0, 1],
          [1, 0, 0],
          [5, 5, 1],
          [6, 3, 0],
        ],
      };
      const proof1 = await this.genCreateProof(playerCreate);
      console.log('proof1', proof1);
      const contract = getBattleshipContract(this.provider);
      //const createGame = await contract.createGame();
    } else {
    }
    this.server.emit(`serverRabbitSet:${body.roomId}:${body.telegramUserId}`);

    if (isRoomCreator) {
      this.server.emit(`gameStarted:${body.roomId}:${body.telegramUserId}`);
    }
  }

  @SubscribeMessage('clientUserMove')
  public handleUserMove(
    client: Socket,
    body: {
      coordinates: { x: 1; y: 2 };
      rabbits: [{ x: 1; y: 2 }, { x: 2; y: 1 }];
      telegramUserId: number;
      roomId: string;
    },
  ) {
    //contract call to get last move
    //check is last move compare to rabbits of current user (true/false)
    //contract call to move
    //await tx
    //contract call getGame. If winner, call
    this.server.emit(`winner:${body.roomId}`, { username: true });

    //if first move null
    this.server.emit(`serverUserMove:${body.roomId}:${body.telegramUserId}`, { lastMove: true });
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
}
