import { MigrationInterface, QueryRunner } from "typeorm";

export class RegistrationAdded1668586999685 implements MigrationInterface {
    name = 'RegistrationAdded1668586999685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "registration" ("id" SERIAL NOT NULL, "companyName" character varying NOT NULL, "representativeName" character varying NOT NULL, "representativeNid" character varying NOT NULL, "address" character varying NOT NULL, "email" character varying NOT NULL, "mobile" integer NOT NULL, "name" character varying NOT NULL, "contact" integer NOT NULL, "postalCode" character varying NOT NULL, CONSTRAINT "UQ_55cef1db593d3b0d159559d1d8b" UNIQUE ("companyName"), CONSTRAINT "UQ_ce657140898dbd9002ceaf2a13c" UNIQUE ("email"), CONSTRAINT "UQ_5d185c787e7e70638121b2e2d6f" UNIQUE ("mobile"), CONSTRAINT "PK_cb23dc9d28df8801b15e9e2b8d6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "registration"`);
    }

}
