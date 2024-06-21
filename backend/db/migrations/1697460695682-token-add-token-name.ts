import { MigrationInterface, QueryRunner } from "typeorm";

export class TokenAddTokenName1697460695682 implements MigrationInterface {
    name = 'TokenAddTokenName1697460695682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Token\` ADD \`name\` varchar(50) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Token\` DROP COLUMN \`name\``);
    }

}
