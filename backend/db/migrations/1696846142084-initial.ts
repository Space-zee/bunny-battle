import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1696846142084 implements MigrationInterface {
    name = 'Initial1696846142084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Token\` (\`id\` int NOT NULL AUTO_INCREMENT, \`address\` varchar(42) NOT NULL, \`ticker\` varchar(50) NOT NULL, \`decimals\` tinyint NOT NULL, \`chainId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Operation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`telegramUserId\` bigint NOT NULL, \`replyMessageId\` bigint NOT NULL, \`operationType\` varchar(25) NOT NULL, \`transactionType\` varchar(25) NOT NULL, \`tokenId\` int NULL, \`amount\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Wallet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`address\` varchar(42) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Trades\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` bigint NOT NULL, \`operationId\` bigint NOT NULL, \`delayedCaseId\` bigint NULL, \`wallet\` varchar(42) NOT NULL, \`to\` varchar(42) NOT NULL, \`hash\` varchar(66) NOT NULL, \`status\` varchar(255) NOT NULL, \`chainId\` int NOT NULL, \`blockNumber\` int NOT NULL, \`createdAt\` timestamp(3) NULL, \`updatedAt\` timestamp(3) NULL, \`submittedAt\` timestamp(3) NULL, \`minedAt\` timestamp(3) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`AccessCode\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(50) NOT NULL, \`userId\` int NULL, UNIQUE INDEX \`REL_c8fb18e732c95c9fa7069e7ab9\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` int NOT NULL AUTO_INCREMENT, \`chatId\` bigint NOT NULL, \`telegramUserId\` bigint NOT NULL, \`isBot\` tinyint NOT NULL, \`firstName\` varchar(50) NOT NULL, \`username\` varchar(255) NOT NULL, \`languageCode\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`DelayedCases\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`operationId\` int NOT NULL, \`correlationId\` varchar(36) NOT NULL, \`wallet\` varchar(42) NOT NULL, \`from\` varchar(42) NOT NULL, \`to\` varchar(42) NOT NULL, \`token\` varchar(42) NOT NULL, \`maxValue\` varchar(255) NOT NULL, \`extraPriority\` varchar(255) NOT NULL, \`chainId\` int NOT NULL, \`blocksRetry\` int NOT NULL, \`status\` varchar(255) NOT NULL, \`trigger\` varchar(255) NOT NULL, \`simulationSource\` varchar(255) NOT NULL, \`operationType\` varchar(255) NOT NULL, \`callData\` varchar(8000) NULL, \`createdAt\` timestamp(3) NULL, \`expiredAt\` timestamp(3) NULL, \`updatedAt\` timestamp(3) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`UnprocessedTrades\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` bigint NOT NULL, \`operationId\` bigint NOT NULL, \`delayedCaseId\` bigint NULL, \`correlationId\` varchar(36) NOT NULL, \`wallet\` varchar(42) NOT NULL, \`from\` varchar(42) NOT NULL, \`to\` varchar(42) NOT NULL, \`value\` varchar(255) NOT NULL, \`gasLimit\` varchar(255) NOT NULL, \`callData\` varchar(8000) NULL, \`maxPriorityFeePerGas\` varchar(255) NOT NULL, \`maxFeePerGas\` varchar(255) NOT NULL, \`chainId\` int NOT NULL, \`hash\` varchar(66) NOT NULL, \`submittedAt\` timestamp(3) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_tokens_token\` (\`userId\` int NOT NULL, \`tokenId\` int NOT NULL, INDEX \`IDX_a803b32d949b0c3a87eae8b939\` (\`userId\`), INDEX \`IDX_a0cfe53c0e5f1bfb3d70d47d72\` (\`tokenId\`), PRIMARY KEY (\`userId\`, \`tokenId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Operation\` ADD CONSTRAINT \`FK_6ba4e556e5573ae6b1f4b29397c\` FOREIGN KEY (\`tokenId\`) REFERENCES \`Token\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Wallet\` ADD CONSTRAINT \`FK_2f7aa51d6746fc8fc8ed63ddfbc\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`AccessCode\` ADD CONSTRAINT \`FK_c8fb18e732c95c9fa7069e7ab9a\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`DelayedCases\` ADD CONSTRAINT \`FK_5202025a1eb8729f2ee70487ed2\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`DelayedCases\` ADD CONSTRAINT \`FK_9cdf88b6e3be00da3e163db5b4c\` FOREIGN KEY (\`operationId\`) REFERENCES \`Operation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_tokens_token\` ADD CONSTRAINT \`FK_a803b32d949b0c3a87eae8b9391\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_tokens_token\` ADD CONSTRAINT \`FK_a0cfe53c0e5f1bfb3d70d47d72a\` FOREIGN KEY (\`tokenId\`) REFERENCES \`Token\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_tokens_token\` DROP FOREIGN KEY \`FK_a0cfe53c0e5f1bfb3d70d47d72a\``);
        await queryRunner.query(`ALTER TABLE \`user_tokens_token\` DROP FOREIGN KEY \`FK_a803b32d949b0c3a87eae8b9391\``);
        await queryRunner.query(`ALTER TABLE \`DelayedCases\` DROP FOREIGN KEY \`FK_9cdf88b6e3be00da3e163db5b4c\``);
        await queryRunner.query(`ALTER TABLE \`DelayedCases\` DROP FOREIGN KEY \`FK_5202025a1eb8729f2ee70487ed2\``);
        await queryRunner.query(`ALTER TABLE \`AccessCode\` DROP FOREIGN KEY \`FK_c8fb18e732c95c9fa7069e7ab9a\``);
        await queryRunner.query(`ALTER TABLE \`Wallet\` DROP FOREIGN KEY \`FK_2f7aa51d6746fc8fc8ed63ddfbc\``);
        await queryRunner.query(`ALTER TABLE \`Operation\` DROP FOREIGN KEY \`FK_6ba4e556e5573ae6b1f4b29397c\``);
        await queryRunner.query(`DROP INDEX \`IDX_a0cfe53c0e5f1bfb3d70d47d72\` ON \`user_tokens_token\``);
        await queryRunner.query(`DROP INDEX \`IDX_a803b32d949b0c3a87eae8b939\` ON \`user_tokens_token\``);
        await queryRunner.query(`DROP TABLE \`user_tokens_token\``);
        await queryRunner.query(`DROP TABLE \`UnprocessedTrades\``);
        await queryRunner.query(`DROP TABLE \`DelayedCases\``);
        await queryRunner.query(`DROP TABLE \`User\``);
        await queryRunner.query(`DROP INDEX \`REL_c8fb18e732c95c9fa7069e7ab9\` ON \`AccessCode\``);
        await queryRunner.query(`DROP TABLE \`AccessCode\``);
        await queryRunner.query(`DROP TABLE \`Trades\``);
        await queryRunner.query(`DROP TABLE \`Wallet\``);
        await queryRunner.query(`DROP TABLE \`Operation\``);
        await queryRunner.query(`DROP TABLE \`Token\``);
    }

}
