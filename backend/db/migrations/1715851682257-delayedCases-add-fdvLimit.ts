import { MigrationInterface, QueryRunner } from "typeorm";

export class DelayedCasesAddFdvLimit1715851682257 implements MigrationInterface {
    name = 'DelayedCasesAddFdvLimit1715851682257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`DelayedCases\` ADD \`fdvLimit\` varchar(50) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`DelayedCases\` DROP COLUMN \`fdvLimit\``);
    }

}
