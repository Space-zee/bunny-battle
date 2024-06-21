import { Module } from '@nestjs/common';
import { PkService } from './pk.service';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  providers: [PkService],
})
export class PkModule {}
