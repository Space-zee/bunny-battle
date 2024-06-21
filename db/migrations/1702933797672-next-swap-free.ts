import { MigrationInterface, QueryRunner } from "typeorm";

export class NextSwapFree1702933797672 implements MigrationInterface {
    name = 'NextSwapFree1702933797672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` ADD \`nextSwapFree\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` DROP COLUMN \`nextSwapFree\``);
    }

}
