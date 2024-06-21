import { MigrationInterface, QueryRunner } from "typeorm";

export class SetCharset1697010307055 implements MigrationInterface {
    name = 'SetCharset1697010307055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`firstName\` \`firstName\` varchar(50) CHARACTER SET "utf8" NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`User\` CHANGE \`firstName\` \`firstName\` varchar(50) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
    }

}
