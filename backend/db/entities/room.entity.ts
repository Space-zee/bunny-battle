import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'telegramUserId', nullable: false, type: 'bigint', unique: true })
  public telegramUserId: number;

  @Column({ name: 'roomId', length: 255, nullable: false })
  public roomId: string;

  @Column({ name: 'status', length: 255, nullable: false })
  public status: string;

  @Column({
    name: 'createdAt',
    type: 'timestamp',
    precision: 3,
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  public createdAt: Date;
}
