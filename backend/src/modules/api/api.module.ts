import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from '../../../db/entities/room.entity';
import { UserEntity } from '../../../db/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity, UserEntity])],
  providers: [ApiService],
  controllers: [ApiController],
})
export class ApiModule {}
