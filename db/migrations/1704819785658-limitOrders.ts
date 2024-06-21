import { MigrationInterface, QueryRunner } from "typeorm";

export class LimitOrders1704819785658 implements MigrationInterface {
    name = 'LimitOrders1704819785658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`LimitOrders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`to\` varchar(42) NOT NULL, \`walletAddress\` varchar(42) NOT NULL, \`chainId\` int NOT NULL, \`status\` varchar(255) NOT NULL, \`operationType\` varchar(255) NOT NULL, \`baseAmount\` varchar(255) NOT NULL, \`quoteAmount\` varchar(255) NULL, \`targetFDV\` varchar(50) NULL, \`selectedAmountOption\` varchar(50) NOT NULL, \`selectedPriceOption\` varchar(50) NULL, \`correlationId\` varchar(255) NOT NULL, \`createdAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), \`updatedAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3), \`userId\` int NOT NULL, \`operationId\` int NOT NULL, \`positionId\` int NULL, \`tokenId\` int NOT NULL, UNIQUE INDEX \`REL_8c12ed4b4f0bcf229d8cdbd27c\` (\`operationId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`LimitOrders\` ADD CONSTRAINT \`FK_2cc16fa1038dfbf6e83a5365e81\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`LimitOrders\` ADD CONSTRAINT \`FK_8c12ed4b4f0bcf229d8cdbd27c4\` FOREIGN KEY (\`operationId\`) REFERENCES \`Operation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`LimitOrders\` ADD CONSTRAINT \`FK_acd5afd14246e89634d1b58eed0\` FOREIGN KEY (\`positionId\`) REFERENCES \`Position\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`LimitOrders\` ADD CONSTRAINT \`FK_b6b6b5912ae65934c0401e68f75\` FOREIGN KEY (\`tokenId\`) REFERENCES \`Token\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`LimitOrders\` DROP FOREIGN KEY \`FK_b6b6b5912ae65934c0401e68f75\``);
        await queryRunner.query(`ALTER TABLE \`LimitOrders\` DROP FOREIGN KEY \`FK_acd5afd14246e89634d1b58eed0\``);
        await queryRunner.query(`ALTER TABLE \`LimitOrders\` DROP FOREIGN KEY \`FK_8c12ed4b4f0bcf229d8cdbd27c4\``);
        await queryRunner.query(`ALTER TABLE \`LimitOrders\` DROP FOREIGN KEY \`FK_2cc16fa1038dfbf6e83a5365e81\``);
        await queryRunner.query(`DROP INDEX \`REL_8c12ed4b4f0bcf229d8cdbd27c\` ON \`LimitOrders\``);
        await queryRunner.query(`DROP TABLE \`LimitOrders\``);
    }

}
