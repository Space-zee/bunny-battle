import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveVolumeFromTrades1703726109332 implements MigrationInterface {
    name = 'RemoveVolumeFromTrades1703726109332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`volume\``);
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`gasCostUsd\``);
        await queryRunner.query(`ALTER TABLE \`Position\` DROP COLUMN \`averageUsdPrice\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Position\` ADD \`averageUsdPrice\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`gasCostUsd\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`volume\` float(12) NULL`);
    }

}
