import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { OperationEntity } from './operation.entity';
import { TokenEntity } from './token.entity';
import { PositionEntity } from './position.entity';
import { DelayedCaseStatusEnum } from '../../src/shared/enums/delayedCase.enum';
import { OperationTypeEnum } from '../../src/shared/enums/operationType.enum';

@Entity('LimitOrders')
export class LimitOrdersEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'to', length: 44, nullable: false })
  public to: string;

  @Column({ name: 'walletAddress', length: 44, nullable: false })
  public walletAddress: string;

  @Column({ name: 'chainId', nullable: false })
  public chainId: number;

  @Column({ name: 'status', nullable: false })
  public status: DelayedCaseStatusEnum;

  @Column({ name: 'operationType', nullable: false })
  public operationType: OperationTypeEnum;

  @Column({ name: 'baseAmount', length: 255, nullable: false })
  public baseAmount: string;

  @Column({ name: 'quoteAmount', length: 255, nullable: true })
  public quoteAmount: string;

  @Column({ name: 'targetFDV', length: 50, nullable: true })
  public targetFDV: string;

  @Column({ name: 'selectedAmountOption', length: 50, nullable: false })
  public selectedAmountOption: string;

  @Column({ name: 'selectedPriceOption', length: 50, nullable: true })
  public selectedPriceOption: string;

  @Column({ name: 'correlationId', length: 255, nullable: false })
  public correlationId: string;

  @Column({
    name: 'createdAt',
    type: 'timestamp',
    precision: 3,
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  public createdAt: Date;

  @Column({
    name: 'updatedAt',
    type: 'timestamp',
    precision: 3,
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  public updatedAt: Date;

  @Column({ name: 'userId', nullable: false })
  public userId: number;

  @ManyToOne(() => UserEntity)
  public user: UserEntity;

  @Column({ name: 'operationId', nullable: false })
  public operationId: number;

  @OneToOne(() => OperationEntity)
  @JoinColumn()
  public operation: OperationEntity;

  @Column({ name: 'positionId', nullable: true })
  public positionId: number;

  @ManyToOne(() => PositionEntity)
  public position: PositionEntity;

  @Column({ name: 'tokenId', nullable: false })
  public tokenId: number;

  @ManyToOne(() => TokenEntity)
  public token: TokenEntity;
}
