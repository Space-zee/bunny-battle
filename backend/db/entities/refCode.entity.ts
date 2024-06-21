import { BaseEntity, Entity, PrimaryColumn, ManyToOne, Column } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('RefCode')
export class RefCodeEntity extends BaseEntity {
  @PrimaryColumn({ name: 'code', length: 50 })
  public code: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  public user: UserEntity;

  @Column({ name: 'tier1UserRefs', nullable: false, default: 0 })
  public tier1UserRefs: number;

  @Column({ name: 'tier2UserRefs', nullable: false, default: 0 })
  public tier2UserRefs: number;

  @Column({ name: 'tier3UserRefs', nullable: false, default: 0 })
  public tier3UserRefs: number;
}
