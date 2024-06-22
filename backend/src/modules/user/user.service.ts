import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from '../../../db/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IResponse } from '../../shared/interfaces/response.interface';
import { WalletEntity } from '../../../db/entities/wallet.entity';
import { ethers } from 'ethers';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
  ) {}

  public async createUser(
    telegramUserId: number,
    firstName: string,
    username: string,
  ): Promise<IResponse<{ wallet: WalletEntity }>> {
    this.logger.log(`createUser | ${telegramUserId}`);
    try {
      let userEntity = await this.userRepository.findOne({
        where: { telegramUserId },
        relations: { wallets: true },
      });
      if (!userEntity) {
        userEntity = this.userRepository.create({
          telegramUserId,
          firstName,
          username,
          nonce: Math.floor(Math.random() * 90000) + 10000,
        });
        await userEntity.save();
      }

      return {
        success: true,
        data: {
          wallet: userEntity.wallets && userEntity.wallets[0],
        },
      };
    } catch (e) {
      this.logger.error(`createUser error | ${e}`);

      return {
        success: false,
      };
    }
  }

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
