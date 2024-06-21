import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateWalletName1712923124607 implements MigrationInterface {
  name = 'UpdateWalletName1712923124607';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE Wallet MODIFY \`walletName\` VARCHAR (255) COLLATE utf8mb4_unicode_ci NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE Wallet MODIFY \`walletName\` VARCHAR (255) COLLATE utf8_unicode_ci NOT NULL;`,
    );
  }
}
