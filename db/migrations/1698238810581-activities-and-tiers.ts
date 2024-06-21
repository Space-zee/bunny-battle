import { MigrationInterface, QueryRunner } from "typeorm";

export class ActivitiesAndTiers1698238810581 implements MigrationInterface {
    name = 'ActivitiesAndTiers1698238810581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Activity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`assignedPoints\` float NOT NULL, \`pointsSource\` varchar(255) NOT NULL, \`createdAt\` timestamp(3) NOT NULL, \`tradeId\` int NOT NULL, \`userId\` int NOT NULL, UNIQUE INDEX \`REL_ef5283ae07503b316da55072bc\` (\`tradeId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`volume\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`User\` ADD \`currentTier\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`User\` ADD \`userPoints\` float NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`User\` ADD \`dailyMultiplicator\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`User\` ADD \`multiplicatorUpdatedAt\` timestamp(3) NULL`);
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Activity\` ADD CONSTRAINT \`FK_ef5283ae07503b316da55072bcd\` FOREIGN KEY (\`tradeId\`) REFERENCES \`Trades\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Activity\` ADD CONSTRAINT \`FK_a58583d5e7a35e258f20924c80f\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD CONSTRAINT \`FK_aaef34ce4dfb4b08f42c59dd632\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP FOREIGN KEY \`FK_aaef34ce4dfb4b08f42c59dd632\``);
        await queryRunner.query(`ALTER TABLE \`Activity\` DROP FOREIGN KEY \`FK_a58583d5e7a35e258f20924c80f\``);
        await queryRunner.query(`ALTER TABLE \`Activity\` DROP FOREIGN KEY \`FK_ef5283ae07503b316da55072bcd\``);
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`userId\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`User\` DROP COLUMN \`multiplicatorUpdatedAt\``);
        await queryRunner.query(`ALTER TABLE \`User\` DROP COLUMN \`dailyMultiplicator\``);
        await queryRunner.query(`ALTER TABLE \`User\` DROP COLUMN \`userPoints\``);
        await queryRunner.query(`ALTER TABLE \`User\` DROP COLUMN \`currentTier\``);
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`volume\``);
        await queryRunner.query(`DROP INDEX \`REL_ef5283ae07503b316da55072bc\` ON \`Activity\``);
        await queryRunner.query(`DROP TABLE \`Activity\``);
    }

}
