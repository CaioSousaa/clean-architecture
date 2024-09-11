import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntityDb } from "../user/user-entity-db";

@Entity("card_bank")
export class CardBankEntityDb extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  cvv: number;

  @Column({ length: 6 })
  validaty: string;

  @ManyToOne(() => UserEntityDb, (user) => user.card_bank)
  user: UserEntityDb;

  @Column()
  number_card: number;
}
