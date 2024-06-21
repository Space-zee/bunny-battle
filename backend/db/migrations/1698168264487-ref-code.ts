import { MigrationInterface, QueryRunner } from "typeorm";

export class RefCode1698168264487 implements MigrationInterface {
    name = 'RefCode1698168264487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`RefCode\` (\`code\` varchar(50) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`code\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`User\` ADD \`refUserId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`RefCode\` ADD CONSTRAINT \`FK_0cc81af37f7563c5f800b13f7e7\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`RefCode\` DROP FOREIGN KEY \`FK_0cc81af37f7563c5f800b13f7e7\``);
        await queryRunner.query(`ALTER TABLE \`User\` DROP COLUMN \`refUserId\``);
        await queryRunner.query(`DROP TABLE \`RefCode\``);
    }

}
