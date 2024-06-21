import { MigrationInterface, QueryRunner } from "typeorm";

export class TokenRelationForDelaycasess1697127148613 implements MigrationInterface {
    name = 'TokenRelationForDelaycasess1697127148613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`DelayedCases\` ADD \`tokenInfoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`DelayedCases\` ADD CONSTRAINT \`FK_ee154fa221f4aa369197ab73228\` FOREIGN KEY (\`tokenInfoId\`) REFERENCES \`Token\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`DelayedCases\` DROP FOREIGN KEY \`FK_ee154fa221f4aa369197ab73228\``);
        await queryRunner.query(`ALTER TABLE \`DelayedCases\` DROP COLUMN \`tokenInfoId\``);
    }

}
