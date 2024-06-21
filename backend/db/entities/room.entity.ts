import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Room')
export class RoomEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'telegramUserId', nullable: false, type: 'bigint' })
  public telegramUserId: number;

  @Column({ name: 'roomId', length: 255, nullable: false })
  public roomId: string;

  @Column({ name: 'contractRoomId', length: 255, nullable: true })
  public contractRoomId: string;

  @Column({ name: 'status', length: 255, nullable: false })
  public status: string;

  @Column({ name: 'bet', length: 255, nullable: false })
  public bet: string;

  @Column({
    name: 'createdAt',
    type: 'timestamp',
    precision: 3,
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  public createdAt: Date;
}
