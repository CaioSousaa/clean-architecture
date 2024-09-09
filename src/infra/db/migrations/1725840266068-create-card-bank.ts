import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCardBank1725840266068 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "card_bank",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "cvv",
            type: "numeric",
            isUnique: true,
          },
          {
            name: "number_card",
            type: "numeric",
            isUnique: true,
          },
          {
            name: "validaty",
            type: "varchar",
          },
          {
            name: "id_user",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("card_bank");
  }
}
