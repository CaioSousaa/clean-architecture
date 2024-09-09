import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class UpdateUser1725841168797 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("user", [
      new TableColumn({
        name: "email",
        type: "varchar",
        isUnique: true,
      }),
      new TableColumn({
        name: "password",
        type: "varchar",
        length: "100",
      }),
      new TableColumn({
        name: "status_plan",
        type: "boolean",
        default: false,
      }),
      new TableColumn({
        name: "card_bank_id",
        type: "uuid",
        isNullable: true,
      }),
    ]);

    await queryRunner.createForeignKey(
      "user",
      new TableForeignKey({
        columnNames: ["card_bank_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "card_bank",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("user", "FK_user_card_bank");
    await queryRunner.dropColumns("user", [
      "email",
      "password",
      "status_plan",
      "card_bank_id",
    ]);
  }
}
