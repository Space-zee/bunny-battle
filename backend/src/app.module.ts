import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import {TelegramModule} from "./modules/telegram/telegram.module";
import {TypeOrmModule} from "@nestjs/typeorm";


@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN,
    }),
  ],
  providers: [TelegramModule],
})
export class AppModule {}
