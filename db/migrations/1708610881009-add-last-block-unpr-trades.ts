import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastBlockUnprTrades1708610881009 implements MigrationInterface {
    name = 'AddLastBlockUnprTrades1708610881009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`UnprocessedTrades\` ADD \`blockForLastCheck\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`UnprocessedTrades\` DROP COLUMN \`blockForLastCheck\``);
    }

}
