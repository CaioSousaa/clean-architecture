import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRegisterPlan1727702877740 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(`
      ALTER TABLE "register_plan"
      ALTER COLUMN "id" SET DEFAULT uuid_generate_v4(),
      ALTER COLUMN "id" TYPE uuid USING ("id"::uuid);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "register_plan"
      ALTER COLUMN "id" DROP DEFAULT,
      ALTER COLUMN "id" TYPE varchar USING ("id"::varchar);
    `);
  }
}
