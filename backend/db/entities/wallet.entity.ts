import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('Wallet')
export class WalletEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'userId', nullable: false })
  public userId: number;

  @Column({ name: 'address', length: 42, nullable: false })
  public address: string;

  @Column({ name: 'privateKey', length: 66, nullable: false })
  public privateKey: string;

  @ManyToOne(() => UserEntity, (user) => user.wallets)
  user: UserEntity;
}
