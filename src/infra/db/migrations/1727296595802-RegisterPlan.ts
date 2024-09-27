import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class RegisterPlan1727296595802 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "register_plan",
        columns: [
          {
            name: "id",
            generationStrategy: "uuid",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "varchar",
          },
          {
            name: "plan_id",
            type: "enum",
            enum: ["1", "2", "3"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("register_plan");
  }
}
