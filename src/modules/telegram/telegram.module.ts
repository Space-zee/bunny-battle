import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  providers: [TelegramService],
})
export class TelegramModule {}
