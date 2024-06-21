import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAntirugColumnToDelayedCases1712959486279 implements MigrationInterface {
    name = 'AddAntirugColumnToDelayedCases1712959486279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`DelayedCases\` ADD \`antirug\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`DelayedCases\` DROP COLUMN \`antirug\``);
    }

}
