import { MigrationInterface, QueryRunner } from "typeorm";

export class Csv1727270231652 implements MigrationInterface {
    name = 'Csv1727270231652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "csv" ("id" varchar PRIMARY KEY NOT NULL, "created_at" date NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "path" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "csv"`);
    }

}
