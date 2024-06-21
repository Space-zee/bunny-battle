import { Injectable } from '@nestjs/common';
import { Action, Command, Hears, Start, Update } from 'nestjs-telegraf';
import {parseUsername} from "../../shared/utils/utils";

@Injectable()
export class PkService {
  public async createWallet() {

  }
}
