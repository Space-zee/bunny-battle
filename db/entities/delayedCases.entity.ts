import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DelayedCaseStatusEnum } from '../../src/shared/enums/delayedCase.enum';
import { CaseTriggerEnum } from '../../src/shared/enums/caseTrigger.enum';
import { CaseSimulationSourceEnum } from '../../src/shared/enums/caseSimulationSource.enum';
import { OperationTypeEnum } from '../../src/shared/enums/operationType.enum';
import { UserEntity } from './user.entity';
import { OperationEntity } from './operation.entity';
import { TokenEntity } from './token.entity';

@Entity('DelayedCases')
export class DelayedCasesEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'userId', nullable: false })
  public userId: number;

  @Column({ name: 'operationId', nullable: false })
  public operationId: number;

  @Column({ name: 'correlationId', length: 36, nullable: false })
  public correlationId: string;

  @Column({ name: 'wallet', length: 44, nullable: false })
  public wallet: string;

  @Column({ name: 'from', length: 44, nullable: false })
  public from: string;

  @Column({ name: 'to', length: 44, nullable: false })
  public to: string;

  @Column({ name: 'token', length: 44, nullable: false })
  public token: string;

  @Column({ name: 'maxValue', length: 255, nullable: false })
  public maxValue: string;

  @Column({ name: 'extraPriority', length: 255, nullable: false })
  public extraPriority: string;

  @Column({ name: 'chainId', nullable: false })
  public chainId: number;

  @Column({ name: 'blocksRetry', nullable: false })
  public blocksRetry: number;

  @Column({ name: 'antirug', nullable: false, default: false })
  public antirug: boolean;

  @Column({ name: 'status', nullable: false })
  public status: DelayedCaseStatusEnum;

  @Column({ name: 'trigger', nullable: false })
  public trigger: CaseTriggerEnum;

  @Column({ name: 'simulationSource', nullable: false })
  public simulationSource: CaseSimulationSourceEnum;

  @Column({ name: 'operationType', nullable: false })
  public operationType: OperationTypeEnum;

  @Column({ name: 'callData', length: 8000, nullable: true })
  public callData: string;

  @Column({ name: 'fdvLimit', length: 50, nullable: true })
  public fdvLimit: string;

  @Column({ name: 'createdAt', type: 'timestamp', precision: 3, nullable: true })
  public createdAt: Date;

  @Column({ name: 'expiredAt', type: 'timestamp', precision: 3, nullable: true })
  public expiredAt: Date;

  @Column({ name: 'updatedAt', type: 'timestamp', precision: 3, nullable: true })
  public updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.delayedOrders)
  user: UserEntity;

  @ManyToOne(() => OperationEntity)
  public operation: OperationEntity;

  @ManyToOne(() => TokenEntity)
  public tokenInfo: TokenEntity;
}
