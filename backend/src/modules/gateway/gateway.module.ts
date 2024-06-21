import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../../db/entities/user.entity';
import { WalletEntity } from '../../../db/entities/wallet.entity';
import { GatewayService } from './gateway.service';

dotenv.config();

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, WalletEntity])],
  providers: [GatewayService],
  exports: [GatewayService],
})
export class GatewayModule {}
