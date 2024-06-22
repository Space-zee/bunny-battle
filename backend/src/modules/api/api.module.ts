import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from '../../../db/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity])],
  providers: [ApiService],
  controllers: [ApiController],
})
export class ApiModule {}
