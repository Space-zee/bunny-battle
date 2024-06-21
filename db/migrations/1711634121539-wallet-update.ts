import { MigrationInterface, QueryRunner } from 'typeorm';

export class WalletUpdate1711634121539 implements MigrationInterface {
  name = 'WalletUpdate1711634121539';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`Wallet\` ADD \`isActive\` tinyint NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`Wallet\` ADD \`isDeleted\` tinyint NOT NULL DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE \`Wallet\` ADD \`walletName\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`Wallet\` ADD \`walletSource\` varchar(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`Position\` ADD \`walletId\` int NOT NULL`);
    await queryRunner.query(`UPDATE Wallet SET isActive = true`);
    await queryRunner.query(`UPDATE Wallet SET walletName = 'Alfred Wallet'`);
    await queryRunner.query(`UPDATE Wallet SET walletSource = 'default'`);
    await queryRunner.query(`UPDATE Position SET walletId = 0`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`Position\` DROP COLUMN \`walletId\``);
    await queryRunner.query(`ALTER TABLE \`Wallet\` DROP COLUMN \`walletSource\``);
    await queryRunner.query(`ALTER TABLE \`Wallet\` DROP COLUMN \`walletName\``);
    await queryRunner.query(`ALTER TABLE \`Wallet\` DROP COLUMN \`isDeleted\``);
    await queryRunner.query(`ALTER TABLE \`Wallet\` DROP COLUMN \`isActive\``);
  }
}
