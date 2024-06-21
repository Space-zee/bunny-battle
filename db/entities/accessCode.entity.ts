import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('AccessCode')
export class AccessCodeEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'code', nullable: false, length: 50 })
  public code: string;

  @Column({ name: 'userId', nullable: true })
  public userId: number;

  @OneToOne(() => UserEntity, (user) => user.accessCode)
  @JoinColumn()
  public user: UserEntity;
}
