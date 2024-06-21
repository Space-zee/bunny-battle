import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Token')
export class TokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'address', length: 44, nullable: false })
  public address: string;

  @Column({ name: 'ticker', length: 50, nullable: false })
  public ticker: string;

  @Column({ name: 'name', length: 50, nullable: true })
  public name: string;

  @Column({ name: 'decimals', type: 'tinyint', nullable: false })
  public decimals: number;

  @Column({ name: 'chainId', nullable: false })
  public chainId: number;
}
