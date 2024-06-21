import { MigrationInterface, QueryRunner } from "typeorm";

export class TradesVolumesType1703166957902 implements MigrationInterface {
    name = 'TradesVolumesType1703166957902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`volumeEth\``);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`volumeEth\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`tokensAmount\``);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`tokensAmount\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`ethUsdPrice\``);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`ethUsdPrice\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`gasCostUsd\``);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`gasCostUsd\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`gasCostEth\``);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`gasCostEth\` varchar(50) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`gasCostEth\``);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`gasCostEth\` float(12) NULL`);
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`gasCostUsd\``);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`gasCostUsd\` float(12) NULL`);
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`ethUsdPrice\``);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`ethUsdPrice\` float(12) NULL`);
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`tokensAmount\``);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`tokensAmount\` float(12) NULL`);
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`volumeEth\``);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`volumeEth\` float(12) NULL`);
    }

}
