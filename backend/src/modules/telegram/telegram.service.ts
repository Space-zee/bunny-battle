import { Injectable } from '@nestjs/common';
import { Action, Command, Hears, Start, Update } from 'nestjs-telegraf';
import {parseUsername} from "../../shared/utils/utils";

@Update()
@Injectable()
export class TelegramService {
  @Start()
  async startCommand(ctx: any) {
    const username = parseUsername(ctx.update.message.from.username);
    const startMessage = ''
    // await ctx.setMyCommands([
    //   { command: '/start', description: 'Start bot' },
    //   { command: '/wallet', description: 'Opens wallet menu' },
    //   { command: '/trade', description: 'Opens trade menu' },
    //   { command: '/settings', description: 'Opens settings menu' },
    //   { command: '/info', description: 'Opens info menu' },
    // ]);

    await ctx.reply(startMessage, {
      parse_mode: 'MarkdownV2',
      reply_markup: {
        keyboard: [
          ['Wallet', 'Trade'],
          ['Settings', 'Info'],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  }


}
