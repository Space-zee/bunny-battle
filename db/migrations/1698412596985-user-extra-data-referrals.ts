import { MigrationInterface, QueryRunner } from "typeorm";

export class UserExtraDataReferrals1698412596985 implements MigrationInterface {
    name = 'UserExtraDataReferrals1698412596985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` ADD \`referralsAmount\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`User\` ADD \`pointsFromReferrals\` float NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`Activity\` CHANGE \`createdAt\` \`createdAt\` timestamp(3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`OneTimeActivity\` CHANGE \`createdAt\` \`createdAt\` timestamp(3) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`OneTimeActivity\` CHANGE \`createdAt\` \`createdAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`);
        await queryRunner.query(`ALTER TABLE \`Activity\` CHANGE \`createdAt\` \`createdAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`);
        await queryRunner.query(`ALTER TABLE \`User\` DROP COLUMN \`pointsFromReferrals\``);
        await queryRunner.query(`ALTER TABLE \`User\` DROP COLUMN \`referralsAmount\``);
    }

}
