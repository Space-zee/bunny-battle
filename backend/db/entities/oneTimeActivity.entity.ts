import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('OneTimeActivity')
export class OneTimeActivityEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'activityName', nullable: false })
  public activityName: string;

  @Column({ name: 'points', nullable: false, type: 'float' })
  public points: number;

  @Column({ name: 'createdAt', type: 'timestamp', precision: 3, nullable: false, default: () => 'CURRENT_TIMESTAMP(3)' })
  public createdAt: Date;
}
