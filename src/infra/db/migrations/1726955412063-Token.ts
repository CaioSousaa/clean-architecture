import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Token1726955412063 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "token",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "user_id",
            type: "varchar",
          },
          {
            name: "token",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "expires_in",
            type: "numeric",
          },
          {
            name: "used",
            type: "boolean",
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
    await queryRunner.dropTable("token");
  }
}
