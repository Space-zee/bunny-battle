import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldForOperations1708523923862 implements MigrationInterface {
    name = 'AddFieldForOperations1708523923862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Operation\` ADD \`extraData\` varchar(512) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Operation\` DROP COLUMN \`extraData\``);
    }

}
