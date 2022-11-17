import { MigrationInterface, QueryRunner } from "typeorm";

export class mobileFieldUpdate1668664635623 implements MigrationInterface {
    name = 'mobileFieldUpdate1668664635623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registration" DROP CONSTRAINT "UQ_5d185c787e7e70638121b2e2d6f"`);
        await queryRunner.query(`ALTER TABLE "registration" DROP COLUMN "mobile"`);
        await queryRunner.query(`ALTER TABLE "registration" ADD "mobile" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "registration" ADD CONSTRAINT "UQ_5d185c787e7e70638121b2e2d6f" UNIQUE ("mobile")`);
        await queryRunner.query(`ALTER TABLE "registration" DROP COLUMN "contact"`);
        await queryRunner.query(`ALTER TABLE "registration" ADD "contact" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registration" DROP COLUMN "contact"`);
        await queryRunner.query(`ALTER TABLE "registration" ADD "contact" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "registration" DROP CONSTRAINT "UQ_5d185c787e7e70638121b2e2d6f"`);
        await queryRunner.query(`ALTER TABLE "registration" DROP COLUMN "mobile"`);
        await queryRunner.query(`ALTER TABLE "registration" ADD "mobile" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "registration" ADD CONSTRAINT "UQ_5d185c787e7e70638121b2e2d6f" UNIQUE ("mobile")`);
    }

}
