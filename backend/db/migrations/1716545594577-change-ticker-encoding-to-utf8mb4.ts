import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTickerEncodingToUtf8mb4 implements MigrationInterface {
  name = 'ChangeTickerEncodingToUtf8mb41716545594577';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE Token CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    `);
    await queryRunner.query(`
      ALTER TABLE Token MODIFY ticker VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE Token MODIFY ticker VARCHAR(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
    `);
    await queryRunner.query(`
      ALTER TABLE Token CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
    `);
  }
}
