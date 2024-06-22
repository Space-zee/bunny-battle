import { Controller, Get, HttpException, HttpStatus, Logger, Query, Req } from '@nestjs/common';
import { ApiService } from './api.service';
import { RoomEntity } from '../../../db/entities/room.entity';
import { IGetActiveRoomsRes } from './interfaces';

@Controller()
export class ApiController {
  private readonly logger = new Logger(ApiService.name);
  constructor(private readonly apiService: ApiService) {}

  @Get('getActiveRooms')
  public async getActiveRooms(
    @Query() query: any,
    @Req() request: Request,
  ): Promise<IGetActiveRoomsRes[]> {
    try {
      this.logger.log('getActiveRooms call');

      return await this.apiService.getBattles();
    } catch (e) {
      this.logger.error(`api getActiveRooms error | ${e}`);
      const status = e?.response?.status ? e.response.status : HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(
        {
          status: status,
          error: e?.response?.error
            ? e.response.error
            : 'There was a problem processing your request',
        },
        status,
      );
    }
  }

  @Get('getUserWallet')
  public async getUserWallet(@Query() query: any, @Req() request: Request): Promise<string> {
    try {
      this.logger.log('getActiveRooms call');

      return await this.apiService.getWallet(query.telegramUserId);
    } catch (e) {
      this.logger.error(`api getUserWallet error | ${e}`);
      const status = e?.response?.status ? e.response.status : HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(
        {
          status: status,
          error: e?.response?.error
            ? e.response.error
            : 'There was a problem processing your request',
        },
        status,
      );
    }
  }
}
