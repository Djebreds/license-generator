import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLicenseTable1736340074118 implements MigrationInterface {
    name = 'CreateLicenseTable1736340074118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "licenses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "app_name" character varying NOT NULL, "device_name" character varying NOT NULL, "key" character varying NOT NULL, "hwid" character varying NOT NULL, "expired_at" TIMESTAMP, "day" integer, "user_id" uuid, CONSTRAINT "UQ_a7710ce61d5fabdce13c1b9e1fd" UNIQUE ("key"), CONSTRAINT "UQ_2675923f0c9e451d7f648695a1c" UNIQUE ("hwid"), CONSTRAINT "PK_da5021501ce80efa03de6f40086" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "licenses" ADD CONSTRAINT "FK_cbea824288ca43f273371155c93" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "licenses" DROP CONSTRAINT "FK_cbea824288ca43f273371155c93"`);
        await queryRunner.query(`DROP TABLE "licenses"`);
    }

}
