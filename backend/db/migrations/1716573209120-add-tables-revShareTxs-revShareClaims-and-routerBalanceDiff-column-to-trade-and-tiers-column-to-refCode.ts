import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTablesRevShareTxsRevShareClaimsAndRouterBalanceDiffColumnToTradeAndTiersColumnToRefCode1716573209120 implements MigrationInterface {
    name = 'AddTablesRevShareTxsRevShareClaimsAndRouterBalanceDiffColumnToTradeAndTiersColumnToRefCode1716573209120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`RevShareTxs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`statement\` varchar(50) NOT NULL, \`hash\` varchar(66) NOT NULL, \`createdAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), \`tier\` int NOT NULL, \`claimStatus\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`RevShareClaims\` (\`id\` int NOT NULL AUTO_INCREMENT, \`statement\` varchar(50) NOT NULL, \`userId\` int NOT NULL, \`lastClaimedAt\` timestamp(3) NULL, UNIQUE INDEX \`REL_bf1853380560405208374c0977\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Trades\` ADD \`routerFee\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`RefCode\` ADD \`tier1UserRefs\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`RefCode\` ADD \`tier2UserRefs\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`RefCode\` ADD \`tier3UserRefs\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`RevShareTxs\` ADD CONSTRAINT \`FK_d8547619b3313388cf9e2973df8\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`RevShareClaims\` ADD CONSTRAINT \`FK_bf1853380560405208374c09779\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`RevShareClaims\` DROP FOREIGN KEY \`FK_bf1853380560405208374c09779\``);
        await queryRunner.query(`ALTER TABLE \`RevShareTxs\` DROP FOREIGN KEY \`FK_d8547619b3313388cf9e2973df8\``);
        await queryRunner.query(`ALTER TABLE \`RefCode\` DROP COLUMN \`tier3UserRefs\``);
        await queryRunner.query(`ALTER TABLE \`RefCode\` DROP COLUMN \`tier2UserRefs\``);
        await queryRunner.query(`ALTER TABLE \`RefCode\` DROP COLUMN \`tier1UserRefs\``);
        await queryRunner.query(`ALTER TABLE \`Trades\` DROP COLUMN \`routerFee\``);
        await queryRunner.query(`DROP INDEX \`REL_bf1853380560405208374c0977\` ON \`RevShareClaims\``);
        await queryRunner.query(`DROP TABLE \`RevShareClaims\``);
        await queryRunner.query(`DROP TABLE \`RevShareTxs\``);
    }

}
