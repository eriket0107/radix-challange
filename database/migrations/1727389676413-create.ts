import { MigrationInterface, QueryRunner } from "typeorm";

export class Create1727389676413 implements MigrationInterface {
    name = 'Create1727389676413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sensor" ("id" varchar PRIMARY KEY NOT NULL, "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "equipment_id" varchar NOT NULL, "timestamp" date NOT NULL DEFAULT (datetime('now')), "value" float NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "csv" ("id" varchar PRIMARY KEY NOT NULL, "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "fileName" varchar, "path" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "csv"`);
        await queryRunner.query(`DROP TABLE "sensor"`);
    }

}
