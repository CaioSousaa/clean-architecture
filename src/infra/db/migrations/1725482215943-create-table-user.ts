import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUser1725482215943 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "first_name",
            type: "varchar",
            length: "20",
          },
          {
            name: "surname",
            type: "varchar",
            length: "100",
          },
          {
            name: "age",
            type: "numeric",
          },
          {
            name: "unique_identifier",
            type: "varchar",
          },
          {
            name: "address",
            type: "varchar",
            length: "500",
          },
          {
            name: "created_at",
            type: "date",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
