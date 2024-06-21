import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import * as dotenv from 'dotenv';
import { PkModule } from '../pk/pk.module';
import { UserModule } from '../user/user.module';

dotenv.config();

@Module({
  imports: [PkModule, UserModule],
  providers: [TelegramService],
})
export class TelegramModule {}
