import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnsToPositions1713216621186 implements MigrationInterface {
    name = 'AddColumnsToPositions1713216621186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Position\` ADD \`averageUsdPrice\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`Position\` ADD \`realizedUsdPrice\` varchar(50) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`Position\` ADD \`realizedEthPrice\` varchar(50) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`Position\` ADD \`realizedValue\` varchar(50) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Position\` DROP COLUMN \`realizedValue\``);
        await queryRunner.query(`ALTER TABLE \`Position\` DROP COLUMN \`realizedEthPrice\``);
        await queryRunner.query(`ALTER TABLE \`Position\` DROP COLUMN \`realizedUsdPrice\``);
        await queryRunner.query(`ALTER TABLE \`Position\` DROP COLUMN \`averageUsdPrice\``);
    }

}
