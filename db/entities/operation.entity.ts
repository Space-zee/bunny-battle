import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TokenEntity } from './token.entity';

@Entity('Operation')
export class OperationEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'telegramUserId', nullable: false, type: 'bigint' })
  public telegramUserId: number;

  @Column({ name: 'replyMessageId', nullable: false, type: 'bigint' })
  public replyMessageId: number;

  @Column({ name: 'operationType', length: 25, nullable: false })
  public operationType: string;

  @Column({ name: 'transactionType', length: 25, nullable: false })
  public transactionType: string;

  @Column({ name: 'tokenId', nullable: true })
  public tokenId: number;

  @Column({ name: 'amount', length: 50, nullable: false })
  public amount: string;

  @Column({ name: 'extraData', length: 512, nullable: true })
  public extraData: string;

  @ManyToOne(() => TokenEntity)
  public token: TokenEntity;
}
