import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Operation')
export class OperationEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'txHash', length: 255, nullable: false })
  public txHash: string;

  @Column({ name: 'status', length: 255, nullable: false })
  public status: string;

  @Column({ name: 'userId', length: 255, nullable: false })
  public userId: string;

  @Column({
    name: 'createdAt',
    type: 'timestamp',
    precision: 3,
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  public createdAt: Date;
}
