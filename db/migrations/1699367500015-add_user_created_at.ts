import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserCreatedAt1699367500015 implements MigrationInterface {
    name = 'AddUserCreatedAt1699367500015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` ADD \`createdAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)`);
        await queryRunner.query(`ALTER TABLE \`Activity\` CHANGE \`createdAt\` \`createdAt\` timestamp(3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`OneTimeActivity\` CHANGE \`createdAt\` \`createdAt\` timestamp(3) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`OneTimeActivity\` CHANGE \`createdAt\` \`createdAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`);
        await queryRunner.query(`ALTER TABLE \`Activity\` CHANGE \`createdAt\` \`createdAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`);
        await queryRunner.query(`ALTER TABLE \`User\` DROP COLUMN \`createdAt\``);
    }

}
