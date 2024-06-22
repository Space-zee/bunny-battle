import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../db/entities/user.entity';
import { Repository } from 'typeorm';
import { WalletEntity } from '../../../db/entities/wallet.entity';
import { ethers } from 'ethers';
import { OperationEntity } from '../../../db/entities/operation.entity';
import { OperationStatusEnum } from '../../shared/enum/operation.enum';

@Injectable()
export class BlockchainListenerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(BlockchainListenerService.name);
  private readonly webSocketUrl = `wss://scroll-sepolia.blockpi.network/v1/ws/64e6310d6e6234d8d05d9afcdc60a5ddab5a05a9`;
  private provider: ethers.providers.WebSocketProvider;

  constructor(
    @InjectRepository(OperationEntity)
    private readonly operationRepository: Repository<OperationEntity>,
  ) {}

  onModuleInit() {
    this.connectToEthereum();
  }

  onModuleDestroy() {
    this.disconnectFromEthereum();
  }

  private connectToEthereum() {
    this.provider = new ethers.providers.WebSocketProvider(this.webSocketUrl);

    this.provider.on('block', async (blockNumber) => {
      this.logger.log('New block mined:', blockNumber);
      const operations = await this.operationRepository.find({
        where: { status: OperationStatusEnum.Pending },
      });

      for (const operation of operations) {
        try {
          const tx = await this.provider.getTransactionReceipt(operation.txHash);
          if (!tx) {
            console.log(`Tx pending: ${operation.txHash}`);
          } else {
            console.log(`Tx mined: ${operation.txHash}`);
          }
        } catch (error) {
          this.logger.error(`Error fetching tx details | ${operation.txHash}`, error);
        }
      }
    });

    this.provider._websocket.on('error', (error) => {
      this.logger.error('WebSocket error:', error);
    });

    this.provider._websocket.on('close', () => {
      this.logger.log('WebSocket closed. Attempting to reconnect...');
      setTimeout(() => this.connectToEthereum(), 5000); // Reconnect after 5 seconds
    });
  }

  private disconnectFromEthereum() {
    if (this.provider) {
      this.provider.removeAllListeners();
      this.provider._websocket.close();
    }
  }
}
