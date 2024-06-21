import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../db/entities/user.entity';
import { Repository } from 'typeorm';
import { WalletEntity } from '../../../db/entities/wallet.entity';
import { IResponse } from '../../shared/interfaces/response.interface';
import { ethers } from 'ethers';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway({ cors: { origin: '*' } })
export class GatewayService implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(GatewayService.name);
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
