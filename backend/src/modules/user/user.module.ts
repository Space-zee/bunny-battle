import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { WalletEntity } from '../../../db/entities/wallet.entity';
import { UserEntity } from '../../../db/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, WalletEntity])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
