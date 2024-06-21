import { MigrationInterface, QueryRunner } from "typeorm";

export class OneTimeActivities1698318863756 implements MigrationInterface {
    name = 'OneTimeActivities1698318863756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`OneTimeActivity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`activityName\` varchar(255) NOT NULL, \`points\` float NOT NULL, \`createdAt\` timestamp(3) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_one_time_activities_one_time_activity\` (\`userId\` int NOT NULL, \`oneTimeActivityId\` int NOT NULL, INDEX \`IDX_7a5c74b4ed4966dd6ceef3b785\` (\`userId\`), INDEX \`IDX_5d8784556e1dc468f4774f956b\` (\`oneTimeActivityId\`), PRIMARY KEY (\`userId\`, \`oneTimeActivityId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Activity\` CHANGE \`createdAt\` \`createdAt\` timestamp(3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_one_time_activities_one_time_activity\` ADD CONSTRAINT \`FK_7a5c74b4ed4966dd6ceef3b7857\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_one_time_activities_one_time_activity\` ADD CONSTRAINT \`FK_5d8784556e1dc468f4774f956bc\` FOREIGN KEY (\`oneTimeActivityId\`) REFERENCES \`OneTimeActivity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_one_time_activities_one_time_activity\` DROP FOREIGN KEY \`FK_5d8784556e1dc468f4774f956bc\``);
        await queryRunner.query(`ALTER TABLE \`user_one_time_activities_one_time_activity\` DROP FOREIGN KEY \`FK_7a5c74b4ed4966dd6ceef3b7857\``);
        await queryRunner.query(`ALTER TABLE \`Activity\` CHANGE \`createdAt\` \`createdAt\` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)`);
        await queryRunner.query(`DROP INDEX \`IDX_5d8784556e1dc468f4774f956b\` ON \`user_one_time_activities_one_time_activity\``);
        await queryRunner.query(`DROP INDEX \`IDX_7a5c74b4ed4966dd6ceef3b785\` ON \`user_one_time_activities_one_time_activity\``);
        await queryRunner.query(`DROP TABLE \`user_one_time_activities_one_time_activity\``);
        await queryRunner.query(`DROP TABLE \`OneTimeActivity\``);
    }

}
