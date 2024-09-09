import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CardBankEntityDb } from "../card-bank/card-bank-entity-db";

@Entity("user")
export class UserEntityDb extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 20 })
  first_name: string;

  @Column()
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column("boolean")
  status_plan: boolean;

  @OneToOne(() => CardBankEntityDb)
  @JoinColumn({ name: "card_bank_id" })
  card_bank: CardBankEntityDb;

  @Column({ length: 100 })
  surname: string;

  @Column("numeric")
  age: number;

  @Column()
  unique_identifier: string;

  @Column({ length: 500 })
  address: string;

  @Column("date")
  created_at: Date;
}
