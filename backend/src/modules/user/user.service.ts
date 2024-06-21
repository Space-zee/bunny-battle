import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from '../../../db/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IResponse } from '../../shared/interfaces/response.interface';
import { WalletEntity } from '../../../db/entities/wallet.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
        userEntity = await this.userRepository.create({
          telegramUserId,
          firstName,
          username,
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
}
