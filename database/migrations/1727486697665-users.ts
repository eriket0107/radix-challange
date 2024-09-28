import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1727486697665 implements MigrationInterface {
    name = 'Users1727486697665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password_hash" varchar NOT NULL, "role" varchar NOT NULL DEFAULT ('USER'))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
