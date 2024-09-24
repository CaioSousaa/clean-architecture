import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class UpdateCardBankAddUserId1727214395003
  implements MigrationInterface
{
  private foreignKey = new TableForeignKey({
    columnNames: ["userId"],
    referencedColumnNames: ["id"],
    referencedTableName: "user",
    onDelete: "CASCADE",
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "card_bank",
      new TableColumn({
        name: "userId",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey("card_bank", this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("card_bank", this.foreignKey);

    await queryRunner.dropColumn("card_bank", "userId");
  }
}
