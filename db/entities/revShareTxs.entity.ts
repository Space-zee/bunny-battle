import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('RevShareTxs')
export class RevShareTxsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'userId', nullable: false })
  public userId: number;

  @Column({ name: 'statement', length: 50, nullable: false })
  public statement: string;

  @Column({ name: 'hash', length: 88, nullable: false })
  public hash: string;

  @Column({
    name: 'createdAt',
    type: 'timestamp',
    precision: 3,
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  public createdAt: Date;

  @Column({ name: 'tier', nullable: false })
  public tier: number;

  @Column({ name: 'claimStatus', nullable: false, default: false })
  public claimStatus: boolean;

  @ManyToOne(() => UserEntity, (user) => user.revShareTxs, { nullable: true })
  @JoinColumn()
  user: UserEntity;
}
