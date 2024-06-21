import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueTelegramUserId1699614694581 implements MigrationInterface {
    name = 'UniqueTelegramUserId1699614694581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Activity\` CHANGE \`createdAt\` \`createdAt\` timestamp(3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`OneTimeActivity\` CHANGE \`createdAt\` \`createdAt\` timestamp(3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`User\` ADD UNIQUE INDEX \`IDX_4d04b2d151dfcca0292ea9b463\` (\`telegramUserId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` DROP INDEX \`IDX_4d04b2d151dfcca0292ea9b463\``);
        await queryRunner.query(`ALTER TABLE \`OneTimeActivity\` CHANGE \`createdAt\` \`createdAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`);
        await queryRunner.query(`ALTER TABLE \`Activity\` CHANGE \`createdAt\` \`createdAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`);
    }

}
