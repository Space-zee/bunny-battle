import { MigrationInterface, QueryRunner } from "typeorm";

export class Positions1702884552251 implements MigrationInterface {
    name = 'Positions1702884552251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Position\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`tokenId\` int NULL, \`averageUsdPrice\` varchar(50) NOT NULL, \`averageEthPrice\` varchar(50) NOT NULL, \`positionValue\` varchar(50) NOT NULL, \`status\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`volumeEth\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`tokensAmount\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`ethUsdPrice\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`gasCostUsd\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`gasCostEth\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`Activity\` CHANGE \`createdAt\` \`createdAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)`);
        await queryRunner.query(`ALTER TABLE \`OneTimeActivity\` CHANGE \`createdAt\` \`createdAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)`);
        await queryRunner.query(`ALTER TABLE \`Position\` ADD CONSTRAINT \`FK_07553a7c1cd8f07360837a82c30\` FOREIGN KEY (\`tokenId\`) REFERENCES \`Token\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Position\` ADD CONSTRAINT \`FK_282cc81eea1c738ef2ce7c54201\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Position\` DROP FOREIGN KEY \`FK_282cc81eea1c738ef2ce7c54201\``);
        await queryRunner.query(`ALTER TABLE \`Position\` DROP FOREIGN KEY \`FK_07553a7c1cd8f07360837a82c30\``);
        await queryRunner.query(`ALTER TABLE \`OneTimeActivity\` CHANGE \`createdAt\` \`createdAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`);
        await queryRunner.query(`ALTER TABLE \`Activity\` CHANGE \`createdAt\` \`createdAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`);
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`gasCostEth\``);
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`gasCostUsd\``);
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`ethUsdPrice\``);
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`tokensAmount\``);
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`volumeEth\``);
        await queryRunner.query(`DROP TABLE \`Position\``);
    }

}
