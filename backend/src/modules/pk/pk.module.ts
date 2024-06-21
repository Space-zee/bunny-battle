import { Module } from '@nestjs/common';
import { PkService } from './pk.service';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../../db/entities/user.entity';
import { WalletEntity } from '../../../db/entities/wallet.entity';

dotenv.config();

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, WalletEntity])],
  providers: [PkService],
  exports: [PkService],
})
export class PkModule {}
