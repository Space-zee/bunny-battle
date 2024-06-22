import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WalletEntity } from './wallet.entity';
import { RoomEntity } from './room.entity';

@Entity('User')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'telegramUserId', nullable: false, type: 'bigint', unique: true })
  public telegramUserId: number;

  @Column({ name: 'firstName', length: 50, charset: 'utf8', nullable: true })
  public firstName: string;

  @Column({ name: 'username', length: 255, nullable: false })
  public username: string;

  @Column({
    name: 'createdAt',
    type: 'timestamp',
    precision: 3,
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  public createdAt: Date;

  @OneToMany(() => WalletEntity, (wallet) => wallet.user)
  @JoinColumn({ name: 'userId' })
  wallets: WalletEntity[];

  @OneToMany(() => RoomEntity, (room) => room.user)
  @JoinColumn({ name: 'userId' })
  rooms: RoomEntity[];
}
