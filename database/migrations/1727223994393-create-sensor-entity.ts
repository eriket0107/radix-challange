import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateSensorEntity1727223994393 implements MigrationInterface {
  name = 'CreateSensorEntity1727223994393'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sensor" ("id" varchar PRIMARY KEY NOT NULL, "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "equipment_id" varchar NOT NULL, "timestamp" date NOT NULL DEFAULT (datetime('now')), "value" float NOT NULL)`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sensor"`)
  }
}
