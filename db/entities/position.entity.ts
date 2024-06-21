import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserEntity } from './user.entity';
import { TokenEntity } from './token.entity';
import { PositionStatusEnum } from 'src/shared/enums/positionStatus.enum';

@Entity('Position')
export class PositionEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'userId', nullable: false })
  public userId: number;

  @Column({ name: 'tokenId', nullable: true })
  public tokenId: number;

  @Column({ name: 'walletId', nullable: false })
  public walletId: number;

  @Column({ name: 'averageUsdPrice', length: 50, nullable: true })
  public averageUsdPrice: string;

  @Column({ name: 'averageEthPrice', length: 50, nullable: false })
  public averageEthPrice: string;

  @Column({ name: 'positionValue', length: 50, nullable: false })
  public positionValue: string;

  @Column({ name: 'realizedUsdPrice', length: 50, nullable: false, default: '0' })
  public realizedUsdPrice: string;

  @Column({ name: 'realizedEthPrice', length: 50, nullable: false, default: '0' })
  public realizedEthPrice: string;

  @Column({ name: 'realizedValue', length: 50, nullable: false, default: '0' })
  public realizedValue: string;

  @Column({ name: 'status', nullable: false })
  public status: PositionStatusEnum;

  @ManyToOne(() => TokenEntity)
  public token: TokenEntity;

  @ManyToOne(() => UserEntity)
  public user: UserEntity;
}
