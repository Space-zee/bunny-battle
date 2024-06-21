import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('Wallet')
export class WalletEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'userId', nullable: false })
  public userId: number;

  @Column({ name: 'address', length: 44, nullable: false })
  public address: string;

  @Column({ name: 'isActive' })
  public isActive: boolean;

  @Column({ name: 'isDeleted', nullable: false, default: false })
  public isDeleted: boolean;

  @Column({ name: 'walletName', length: 255, nullable: false })
  public walletName: string;

  @Column({ name: 'walletSource', length: 255, nullable: false })
  public walletSource: string;

  @Column({ name: 'chainType', length: 50, nullable: false })
  public chainType: string;

  @ManyToOne(() => UserEntity, (user) => user.wallets)
  user: UserEntity;
}
