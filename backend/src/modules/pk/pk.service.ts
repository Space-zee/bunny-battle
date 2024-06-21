import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../db/entities/user.entity';
import { Repository } from 'typeorm';
import { WalletEntity } from '../../../db/entities/wallet.entity';
import { IResponse } from '../../shared/interfaces/response.interface';
import { ethers } from 'ethers';

@Injectable()
export class PkService {
  private readonly logger = new Logger(PkService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
  ) {}

  public async createWallet(
    telegramUserId: number,
  ): Promise<IResponse<{ address: string; privateKey: string }>> {
    const userEntity = await this.userRepository.findOne({
      where: { telegramUserId },
      relations: { wallets: true },
    });

    if (!userEntity) {
      this.logger.error('createWallet | no user entity');

      return {
        success: false,
        error: 'Please click /start',
      };
    }
    if (userEntity.wallets.length) {
      this.logger.error('createWallet | wallet exist');

      return {
        success: true,
        data: {
          address: userEntity.wallets[0].address,
          privateKey: userEntity.wallets[0].privateKey,
        },
      };
    }
    const wallet = ethers.Wallet.createRandom();
    console.log('wallet.privateKey', wallet.privateKey.length);

    const walletEntity = this.walletRepository.create({
      address: wallet.address,
      userId: userEntity.id,
      privateKey: wallet.privateKey,
    });
    await walletEntity.save();

    return {
      success: true,
      data: {
        address: wallet.address,
        privateKey: wallet.privateKey,
      },
    };
  }
}
