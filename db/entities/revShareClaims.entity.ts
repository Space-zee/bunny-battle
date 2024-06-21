import { BaseEntity, Column, Entity, JoinColumn, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('RevShareClaims')
export class RevShareClaimsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'statement', length: 50, nullable: false })
  public statement: string;

  @Column({ name: 'userId', nullable: false })
  public userId: number;

  @Column({ name: 'lastClaimedAt', type: 'timestamp', precision: 3, nullable: true })
  public lastClaimedAt: Date;

  @OneToOne(() => UserEntity, (user) => user.revShareClaims, { nullable: true })
  @JoinColumn()
  user: UserEntity;
}
