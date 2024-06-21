import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UnprocessedTrades')
export class UnprocessedTradesEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'userId', nullable: false, type: 'bigint' })
  public userId: number;

  @Column({ name: 'operationId', nullable: false, type: 'bigint' })
  public operationId: number;

  @Column({ name: 'delayedCaseId', nullable: true, type: 'bigint' })
  public delayedCaseId: number;

  @Column({ name: 'correlationId', length: 36, nullable: false })
  public correlationId: string;

  @Column({ name: 'wallet', length: 44, nullable: false })
  public wallet: string;

  @Column({ name: 'from', length: 44, nullable: false })
  public from: string;

  @Column({ name: 'to', length: 44, nullable: false })
  public to: string;

  @Column({ name: 'value', length: 255, nullable: false })
  public value: string;

  @Column({ name: 'gasLimit', length: 255, nullable: false })
  public gasLimit: string;

  @Column({ name: 'callData', length: 8000, nullable: true })
  public callData: string;

  @Column({ name: 'maxPriorityFeePerGas', length: 255, nullable: false })
  public maxPriorityFeePerGas: string;

  @Column({ name: 'maxFeePerGas', length: 255, nullable: false })
  public maxFeePerGas: string;

  @Column({ name: 'chainId', nullable: false })
  public chainId: number;

  @Column({ name: 'hash', length: 88, nullable: false })
  public hash: string;

  @Column({ name: 'submittedAt', type: 'timestamp', precision: 3, nullable: true })
  public submittedAt: Date;

  @Column({ name: 'blockForLastCheck', nullable: true })
  public blockForLastCheck: number;
}
