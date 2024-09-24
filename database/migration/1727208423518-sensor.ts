import { MigrationInterface, QueryRunner } from "typeorm";

export class Sensor1727208423518 implements MigrationInterface {
    name = 'Sensor1727208423518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sensor" ("id" varchar PRIMARY KEY NOT NULL, "created_at" date NOT NULL DEFAULT (datetime('now')), "equipment_id" varchar NOT NULL, "value" float NOT NULL, "timestamp" date NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sensor"`);
    }

}
