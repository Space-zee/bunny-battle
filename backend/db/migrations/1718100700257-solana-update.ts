import { MigrationInterface, QueryRunner } from 'typeorm';

export class SolanaUpdate1718100700257 implements MigrationInterface {
  name = 'SolanaUpdate1718100700257';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`Wallet\` ADD \`chainType\` varchar(50) NOT NULL`);
    await queryRunner.query(`UPDATE Wallet SET chainType = 'evm'`);
    await queryRunner.query(`ALTER TABLE \`Token\` MODIFY COLUMN \`address\` varchar(44) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`Wallet\` MODIFY COLUMN \`address\` varchar(44) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`DelayedCases\` MODIFY COLUMN \`wallet\` varchar(44) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`DelayedCases\` MODIFY COLUMN \`from\` varchar(44) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`DelayedCases\` MODIFY COLUMN \`to\` varchar(44) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`DelayedCases\` MODIFY COLUMN \`token\` varchar(44) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`Trades\` MODIFY COLUMN \`wallet\` varchar(44) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`Trades\` MODIFY COLUMN \`to\` varchar(44) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`Trades\` MODIFY COLUMN \`hash\` varchar(88) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`RevShareTxs\` MODIFY COLUMN \`hash\` varchar(88) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`LimitOrders\` MODIFY COLUMN \`to\` varchar(44) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`LimitOrders\` MODIFY COLUMN \`walletAddress\` varchar(44) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UnprocessedTrades\` MODIFY COLUMN \`wallet\` varchar(44) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UnprocessedTrades\` MODIFY COLUMN \`from\` varchar(44) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UnprocessedTrades\` MODIFY COLUMN \`to\` varchar(44) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UnprocessedTrades\` MODIFY COLUMN \`hash\` varchar(88) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`Wallet\` DROP COLUMN \`chainType\``);
    await queryRunner.query(
      `ALTER TABLE \`UnprocessedTrades\` MODIFY COLUMN \`hash\` varchar(66) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UnprocessedTrades\` MODIFY COLUMN \`to\` varchar(42) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UnprocessedTrades\` MODIFY COLUMN \`from\` varchar(42) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`UnprocessedTrades\` MODIFY COLUMN \`wallet\` varchar(42) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`LimitOrders\` MODIFY COLUMN \`walletAddress\` varchar(42) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`LimitOrders\` MODIFY COLUMN \`to\` varchar(42) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`RevShareTxs\` MODIFY COLUMN \`hash\` varchar(66) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`Trades\` MODIFY COLUMN \`hash\` varchar(66) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`Trades\` MODIFY COLUMN \`to\` varchar(42) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`Trades\` MODIFY COLUMN \`wallet\` varchar(42) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`DelayedCases\` MODIFY COLUMN \`token\` varchar(42) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`DelayedCases\` MODIFY COLUMN \`to\` varchar(42) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`DelayedCases\` MODIFY COLUMN \`from\` varchar(42) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`DelayedCases\` MODIFY COLUMN \`wallet\` varchar(42) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Wallet\` MODIFY COLUMN \`address\` varchar(42) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`Token\` MODIFY COLUMN \`address\` varchar(42) NOT NULL`);
  }
}
