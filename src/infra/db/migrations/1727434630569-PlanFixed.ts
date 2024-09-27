import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PlanFixed1727434630569 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "plan",
        columns: [
          {
            name: "id",
            type: "numeric",
            isPrimary: true,
          },
          {
            name: "price_in_cent",
            type: "numeric",
          },
          {
            name: "description",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("plan");
  }
}
