import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from '../../../db/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ethers } from 'ethers';
import { getBattleshipContract } from '../../shared/utils/getBattleshipContract';
import { ICreateGameReq, IGetActiveRoomsRes } from './interfaces';
import * as fs from 'fs';
import { RoomEntity } from '../../../db/entities/room.entity';
import { RoomStatus } from './enums';
import * as path from 'path';

const createWC = require('../../../assets/circom/board/board_js/witness_calculator.js');
const createWasm = path.resolve(__dirname, '../../assets/circom/board/board_js/board.wasm');
const createZkey = path.resolve(__dirname, '../../../assets/circom/board/board_0001.zkey');
const snarkjs = require('snarkjs');
const bigInt = require('big-integer');
const WITNESS_FILE = '/tmp/witness';

@Injectable()
export class ApiService {
  private readonly logger = new Logger(ApiService.name);

  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getBattles(): Promise<IGetActiveRoomsRes[]> {
    const roomEntity = await this.roomRepository.find({
      relations: { user: true },
      where: { status: RoomStatus.Active },
    });

    return roomEntity.map((el) => {
      return {
        bet: el.bet,
        roomId: el.roomId,
        username: el.user.username ? el.user.username : 'Rand',
      };
    });
  }

  public async getWallet(telegramUserId: number): Promise<string> {
    const userEntity = await this.userRepository.findOne({
      where: { telegramUserId },
      relations: { wallets: true },
    });

    return userEntity.wallets[0].address;
  }

  public async createGame() {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://rpc.ankr.com/scroll_sepolia_testnet',
    );
    const player1Create = {
      nonce: 12345,
      ships: [
        [2, 2],
        [0, 0],
      ],
    };
    const proof1 = await this.genCreateProof(player1Create);

    return proof1;
  }

  private async genCreateProof(input: any) {
    const buffer = fs.readFileSync(createWasm);
    const witnessCalculator = await createWC(buffer);
    const buff = await witnessCalculator.calculateWTNSBin(input);
    // The package methods read from files only, so we just shove it in /tmp/ and hope
    // there is no parallel execution.
    fs.writeFileSync(WITNESS_FILE, buff);
    const { proof, publicSignals } = await snarkjs.groth16.prove(createZkey, WITNESS_FILE);
    const solidityProof = this.proofToSolidityInput(proof);

    return {
      solidityProof: solidityProof,
      inputs: publicSignals,
    };
  }

  private proofToSolidityInput(proof: any): string {
    const proofs: string[] = [
      proof.pi_a[0],
      proof.pi_a[1],
      proof.pi_b[0][1],
      proof.pi_b[0][0],
      proof.pi_b[1][1],
      proof.pi_b[1][0],
      proof.pi_c[0],
      proof.pi_c[1],
    ];
    const flatProofs = proofs.map((p) => bigInt(p));

    return '0x' + flatProofs.map((x) => toHex32(x)).join('');
  }
}

const toHex32 = (num: number) => {
  let str = num.toString(16);
  while (str.length < 64) {
    str = '0' + str;
  }

  return str;
};
