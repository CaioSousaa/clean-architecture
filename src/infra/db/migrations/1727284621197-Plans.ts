import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Plans1727284621197 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "plans",
        columns: [
          {
            name: "id",
            type: "numeric",
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
    await queryRunner.dropTable("plans");
  }
}
