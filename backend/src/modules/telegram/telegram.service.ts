import { Injectable, Logger } from '@nestjs/common';
import { Action, Start, Update } from 'nestjs-telegraf';
import { Context } from '../../shared/interfaces/context.interface';
import { ParseMode } from 'telegraf/typings/core/types/typegram';
import { PkService } from '../pk/pk.service';
import { UserService } from '../user/user.service';
import { startMsg, webAppMsg } from '../../shared/utils/msg';

@Update()
@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);

  constructor(private readonly pkService: PkService, private readonly userService: UserService) {}

  @Start()
  async startCommand(ctx: Context) {
    this.logger.log(`Start bot | ${ctx.from.id}`);
    const userCreate = await this.userService.createUser(
      ctx.from.id,
      ctx.from.first_name,
      ctx.from.username,
    );

    if (!userCreate.success) {
      await ctx.reply('Creation error, please try again /start');

      return;
    }
    if (userCreate.data.wallet) {
      const options = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: `Open App`,
                web_app: {
                  url: 'https://www.kolibr.io/',
                },
              },
            ],
          ],
        },
        parse_mode: <ParseMode>'HTML',
        resize_keyboard: true,
        disable_web_page_preview: true,
      };

      await ctx.reply(
        webAppMsg(userCreate.data.wallet.address, userCreate.data.wallet.privateKey),
        options,
      );

      return;
    }
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: `Create wallet`,
              callback_data: `createWallet`,
            },
          ],
        ],
      },
      parse_mode: <ParseMode>'HTML',
      resize_keyboard: true,
      disable_web_page_preview: true,
    };
    await ctx.reply(startMsg, options);
  }

  @Action('createWallet')
  public async onCreateAccount(ctx: Context) {
    this.logger.log(`createWallet click | ${ctx.from.id}`);
    await ctx.deleteMessage();
    const res = await this.pkService.createWallet(ctx.from.id);

    if (!res.success) {
      await ctx.reply('Creation error, please try again /start');

      return;
    }

    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: `Open App`,
              web_app: {
                url: 'https://www.kolibr.io/',
              },
            },
          ],
        ],
      },
      parse_mode: <ParseMode>'HTML',
      resize_keyboard: true,
      disable_web_page_preview: true,
    };

    await ctx.reply(webAppMsg(res.data.address, res.data.privateKey), options);
  }
}
