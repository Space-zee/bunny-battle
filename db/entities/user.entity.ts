import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TokenEntity } from './token.entity';
import { WalletEntity } from './wallet.entity';
import { DelayedCasesEntity } from './delayedCases.entity';
import { TradesEntity } from './trades.entity';
import { AccessCodeEntity } from './accessCode.entity';
import { ActivityEntity } from './activity.entity';
import { OneTimeActivityEntity } from './oneTimeActivity.entity';
import { RefCodeEntity } from './refCode.entity';
import { PositionEntity } from './position.entity';
import { RevShareTxsEntity } from './revShareTxs.entity';
import { RevShareClaimsEntity } from './revShareClaims.entity';

@Entity('User')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'chatId', nullable: false, type: 'bigint' })
  public chatId: number;

  @Column({ name: 'telegramUserId', nullable: false, type: 'bigint', unique: true })
  public telegramUserId: number;

  @Column({ name: 'isBot', nullable: false })
  public isBot: boolean;

  @Column({ name: 'firstName', length: 50, charset: 'utf8', nullable: true })
  public firstName: string;

  @Column({ name: 'username', length: 255, nullable: false })
  public username: string;

  @Column({ name: 'languageCode', length: 50, nullable: false })
  public languageCode: string;

  @Column({ name: 'refUserId', nullable: true })
  public refUserId: number;

  @Column({ name: 'referralsAmount', nullable: false, default: 0 })
  public referralsAmount: number;

  @Column({ name: 'pointsFromReferrals', nullable: false, type: 'float', default: 0 })
  public pointsFromReferrals: number;

  @Column({ name: 'currentTier', nullable: false, default: 1 })
  public currentTier: number;

  @Column({ name: 'userPoints', nullable: false, type: 'float', default: 0 })
  public userPoints: number;

  @Column({ name: 'volume', nullable: false, type: 'float', default: 0 })
  public volume: number;

  @Column({ name: 'dailyMultiplicator', nullable: false, default: 1 })
  public dailyMultiplicator: number;

  @Column({ name: 'nextSwapFree', nullable: false, default: false })
  public nextSwapFree: boolean;

  @Column({ name: 'multiplicatorUpdatedAt', type: 'timestamp', precision: 3, nullable: true })
  public multiplicatorUpdatedAt: Date;

  @Column({
    name: 'createdAt',
    type: 'timestamp',
    precision: 3,
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  public createdAt: Date;

  @ManyToMany(() => TokenEntity)
  @JoinTable()
  tokens: TokenEntity[];

  @ManyToMany(() => OneTimeActivityEntity)
  @JoinTable()
  oneTimeActivities: OneTimeActivityEntity[];

  @OneToMany(() => WalletEntity, (wallet) => wallet.user)
  @JoinColumn({ name: 'userId' })
  wallets: WalletEntity[];

  @OneToMany(() => DelayedCasesEntity, (dCase) => dCase.user)
  @JoinColumn({ name: 'userId' })
  delayedOrders: DelayedCasesEntity[];

  @OneToMany(() => TradesEntity, (trade) => trade.user)
  trades: TradesEntity[];

  @OneToMany(() => ActivityEntity, (activity) => activity.user)
  @JoinColumn({ name: 'userId' })
  activities: ActivityEntity[];

  @OneToOne(() => AccessCodeEntity, (accessCode) => accessCode.user)
  accessCode: AccessCodeEntity;

  @OneToMany(() => RefCodeEntity, (refCode) => refCode.user)
  refCodes: RefCodeEntity[];

  @OneToMany(() => PositionEntity, (position) => position.user)
  @JoinColumn({ name: 'userId' })
  positions: PositionEntity[];

  @OneToMany(() => RevShareTxsEntity, (revShareTx) => revShareTx.user)
  revShareTxs: RevShareTxsEntity[];

  @OneToOne(() => RevShareClaimsEntity, (revShareClaim) => revShareClaim.user)
  revShareClaims: RevShareClaimsEntity;
}
