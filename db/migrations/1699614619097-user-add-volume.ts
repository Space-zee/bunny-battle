import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAddVolume1699614619097 implements MigrationInterface {
    name = 'UserAddVolume1699614619097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` ADD \`volume\` float NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` DROP COLUMN \`volume\``);
    }

}
