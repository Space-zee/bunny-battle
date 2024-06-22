import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../db/entities/user.entity';
import { Repository } from 'typeorm';
import { WalletEntity } from '../../../db/entities/wallet.entity';
import { IResponse } from '../../shared/interfaces/response.interface';
import { ethers } from 'ethers';
import {
  ConnectedSocket,
  MessageBody,
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

@Injectable()
@WebSocketGateway({ cors: { origin: '*' } })
export class GatewayService implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(GatewayService.name);
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // @SubscribeMessage('chat') // subscribe to chat event messages
  // handleMessage(socket: Socket, payload: any): any {
  //   this.logger.log(`Message received: ${payload.author} - ${payload.body}`);
  //   this.server.emit('chat', payload); // broadbast a message to all clients
  //   console.log(socket.id);
  //
  //   return payload; // return the same payload data
  // }

  @SubscribeMessage('createLobby')
  public async handleCreateLobby(client: Socket, body: { telegramUserId: number; bet: string }) {
    const room = await this.roomRepository.findOne({
      where: { roomId: client.id },
      relations: { user: true },
    });
    const user = await this.userRepository.findOne({
      where: { telegramUserId: body.telegramUserId },
    });
    if (!room) {
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
      this.server.emit(`roomCreated:${body.telegramUserId}`, { roomId: roomEntity.roomId });
      console.log(`Room created and ${client.id} joined`);
    } else {
      client.emit('error', { message: `Room ${room} already exists.` });
    }
  }

  @SubscribeMessage('joinRoom')
  public handleJoinRoom(client: Socket, body: { roomId: string; telegramUserId: number }) {
    console.log(`${body.telegramUserId} joined room: ${body.roomId}`);
    client.join(body.roomId);

    //1. Bet
    //2.Username both
    //3.RoomId
    this.server.emit(`readyForBattle:${body.roomId}`);
  }

  @SubscribeMessage('clientRabbitsSet')
  public handleRabbitSet(
    client: Socket,
    body: { rabbits: [{ x: 1; y: 2 }, { x: 2; y: 1 }]; telegramUserId: number; roomId: string },
  ) {
    //check is create room creator
    //contract call
    //await tx
    //update room contract id
    //send tx confirmed

    //isGameStart user not creator
    this.server.emit(`serverRabbitSet:${body.roomId}:${body.telegramUserId}`);

    //if second user

    // if() {
    //   this.server.emit(`gameStarted:${body.roomId}`);
    // }
  }

  @SubscribeMessage(/clientUserMove/)
  public handleUserMove(
    client: Socket,
    body: { coordinates: { x: 1; y: 2 }; telegramUserId: number; roomId: string },
  ) {
    //contract call
    //await tx
    this.server.emit(`serverUserMove:${body.roomId}:${body.telegramUserId}`);
  }

  async txConfirmed() {}

  @SubscribeMessage('tx')
  public handleRabbitSet(
    client: Socket,
    body: { rabbits: [{ x: 1; y: 2 }, { x: 2; y: 1 }]; telegramUserId: number },
  ) {
    //check is create room creator
    //contract call
    //await tx
    //sendTxEvent
    //update room contract id
    //send tx confirmed
    console.log(`${body.telegramUserId} joined room: ${body.roomId}`);
    client.join(body.roomId);

    this.server.emit(`readyForBattle:${body.roomId}`);
  }

  public handleConnection(socket: Socket): void {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  // it will be handled when a client disconnects from the server
  public handleDisconnect(socket: Socket): void {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }
}
