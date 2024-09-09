import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("card_bank")
export class CardBankEntityDb extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  cvv: number;

  @Column({ length: 6 })
  validity: string;

  @Column()
  id_user: string;

  @Column()
  number_card: number;
}
