import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiService } from './api.service';
import { getBattleshipContract } from '../../shared/utils/getBattleshipContract';
import { ICreateGameReq } from './interfaces';
import { ethers } from 'ethers';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('createRoom')
  public async createRoom() {}

  @Post('createGame')
  public async createGame(@Body() payload: ICreateGameReq, @Req() request: Request) {
    return await this.apiService.createGame(payload);
  }
}
