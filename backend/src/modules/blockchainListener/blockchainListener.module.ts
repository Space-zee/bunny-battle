import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockchainListenerService } from './blockchainListener.service';
import { OperationEntity } from '../../../db/entities/operation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OperationEntity])],
  providers: [BlockchainListenerService],
})
export class BlockchainListenerModule {}
