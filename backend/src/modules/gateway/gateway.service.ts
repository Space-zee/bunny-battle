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
  ) {}

  @SubscribeMessage('chat') // subscribe to chat event messages
  handleMessage(socket: Socket, payload: any): any {
    this.logger.log(`Message received: ${payload.author} - ${payload.body}`);
    this.server.emit('chat', payload); // broadbast a message to all clients
    console.log(socket.id);

    return payload; // return the same payload data
  }

  @SubscribeMessage('createLobby')
  public async handleCreateLobby(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { telegramUserId: number; bet: string },
  ) {
    const room = await this.roomRepository.findOne({
      where: { roomId: client.id },
    });
    if (!room) {
      const roomEntity = this.roomRepository.create({
        roomId: client.id,
        status: 'active',
        telegramUserId: body.telegramUserId,
        bet: body.bet,
      });
      await this.roomRepository.save(roomEntity);

      client.join(roomEntity.roomId);
      this.server
        .to(roomEntity.roomId)
        .emit('roomCreated', { room, message: `Room ${room} has been created.` });
      console.log(`Room ${room} created and ${client.id} joined`);
    } else {
      client.emit('error', { message: `Room ${room} already exists.` });
    }
  }

  @SubscribeMessage('joinRoom')
  public handleJoinRoom(client: Socket, payload: { room: string; username: string }) {
    console.log(`${payload.username} joined room: ${payload.room}`);
    client.join(payload.room);

    this.server.to(payload.room).emit('chat', {
      author: 'System',
      body: ` has joined the room.`,
    });
  }

  handleConnection(socket: Socket) {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  // it will be handled when a client disconnects from the server
  handleDisconnect(socket: Socket) {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }
}
