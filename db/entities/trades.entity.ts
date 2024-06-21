import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HistoryRecordStatusEnum } from '../../src/shared/enums/historyRecordStatus.enum';
import { ActivityEntity } from './activity.entity';
import { UserEntity } from './user.entity';

@Entity('Trades')
export class TradesEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'operationId', nullable: false, type: 'bigint' })
  public operationId: number;

  @Column({ name: 'delayedCaseId', nullable: true, type: 'bigint' })
  public delayedCaseId: number;

  @Column({ name: 'wallet', length: 44, nullable: false })
  public wallet: string;

  @Column({ name: 'to', length: 44, nullable: false })
  public to: string;

  @Column({ name: 'hash', length: 88, nullable: false })
  public hash: string;

  @Column({ name: 'status', nullable: false })
  public status: HistoryRecordStatusEnum;

  @Column({ name: 'chainId', nullable: false })
  public chainId: number;

  @Column({ name: 'blockNumber', nullable: false })
  public blockNumber: number;

  @Column({ name: 'volumeEth', length: 50, nullable: true })
  public volumeEth: string;

  @Column({ name: 'tokensAmount', length: 50, nullable: true })
  public tokensAmount: string;

  @Column({ name: 'ethUsdPrice', length: 50, nullable: true })
  public ethUsdPrice: string;

  @Column({ name: 'gasCostEth', length: 50, nullable: true })
  public gasCostEth: string;

  @Column({ name: 'routerFee', length: 50, nullable: true })
  public routerFee: string;

  @Column({ name: 'createdAt', type: 'timestamp', precision: 3, nullable: true })
  public createdAt: Date;

  @Column({ name: 'updatedAt', type: 'timestamp', precision: 3, nullable: true })
  public updatedAt: Date;

  @Column({ name: 'submittedAt', type: 'timestamp', precision: 3, nullable: true })
  public submittedAt: Date;

  @Column({ name: 'minedAt', type: 'timestamp', precision: 3, nullable: true })
  public minedAt: Date;

  @OneToOne(() => ActivityEntity, (activity) => activity.trade)
  activity: ActivityEntity;

  @ManyToOne(() => UserEntity, (user) => user.trades, { nullable: true })
  @JoinColumn()
  user: UserEntity;
}
