import { Injectable, Logger } from '@nestjs/common';
import { Action, Start, Update } from 'nestjs-telegraf';
import { Context } from '../../shared/interfaces/context.interface';
import { ParseMode } from 'telegraf/typings/core/types/typegram';
import { UserService } from '../user/user.service';
import { startMsg, webAppMsg } from '../../shared/utils/msg';
import { startUrlGif } from '../../shared/constants/startUrlGif.const';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from '../../../db/entities/room.entity';
import { RoomStatus } from '../api/enums';

@Update()
@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);

  constructor(
    private readonly userService: UserService,
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    this.logger.log(`Start bot | ${ctx.from.id}`);
    const userCreate = await this.userService.createUser(
      ctx.from.id,
      ctx.from.first_name,
      ctx.from.username,
    );
    const rooms = await this.roomRepository.find({ where: { status: RoomStatus.Active } });
    const totalBet = this.calculateTotalBet(rooms);

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
                  url: 'https://127.0.0.1:5173/',
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
      caption: startMsg(totalBet),
    };

    await ctx.sendAnimation(startUrlGif, options);
  }

  @Action('createWallet')
  public async onCreateAccount(ctx: Context) {
    this.logger.log(`createWallet click | ${ctx.from.id}`);
    await ctx.deleteMessage();
    const res = await this.userService.createWallet(ctx.from.id);

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
                url: 'https://127.0.0.1:5173/',
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

  private calculateTotalBet = (roomEntity: RoomEntity[]): number => {
    return roomEntity.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.bet),
      0,
    );
  };
}
