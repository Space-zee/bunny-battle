import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { TradesEntity } from './trades.entity';

@Entity('Activity')
export class ActivityEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'assignedPoints', nullable: false, type: 'float' })
  public assignedPoints: number;

  @Column({ name: 'pointsSource', nullable: false })
  public pointsSource: string;

  @Column({ name: 'createdAt', type: 'timestamp', precision: 3, nullable: false, default: () => 'CURRENT_TIMESTAMP(3)' })
  public createdAt: Date;

  @OneToOne(() => TradesEntity, (trades) => trades.activity, { nullable: false })
  @JoinColumn()
  trade: TradesEntity;

  @ManyToOne(() => UserEntity, (user) => user.activities, { nullable: false })
  @JoinColumn()
  user: UserEntity;
}
