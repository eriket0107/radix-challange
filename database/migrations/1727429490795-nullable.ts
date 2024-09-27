import { MigrationInterface, QueryRunner } from "typeorm";

export class Nullable1727429490795 implements MigrationInterface {
    name = 'Nullable1727429490795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_sensor" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "equipment_id" varchar NOT NULL, "timestamp" date DEFAULT (datetime('now')), "value" float)`);
        await queryRunner.query(`INSERT INTO "temporary_sensor"("id", "created_at", "updated_at", "equipment_id", "timestamp", "value") SELECT "id", "created_at", "updated_at", "equipment_id", "timestamp", "value" FROM "sensor"`);
        await queryRunner.query(`DROP TABLE "sensor"`);
        await queryRunner.query(`ALTER TABLE "temporary_sensor" RENAME TO "sensor"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensor" RENAME TO "temporary_sensor"`);
        await queryRunner.query(`CREATE TABLE "sensor" ("id" varchar PRIMARY KEY NOT NULL, "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "equipment_id" varchar NOT NULL, "timestamp" date NOT NULL DEFAULT (datetime('now')), "value" float NOT NULL)`);
        await queryRunner.query(`INSERT INTO "sensor"("id", "created_at", "updated_at", "equipment_id", "timestamp", "value") SELECT "id", "created_at", "updated_at", "equipment_id", "timestamp", "value" FROM "temporary_sensor"`);
        await queryRunner.query(`DROP TABLE "temporary_sensor"`);
    }

}
