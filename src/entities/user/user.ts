import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 20,
  })
  first_name: string;

  @Column({
    length: 100,
  })
  surname: string;

  @Column("number")
  age: number;

  @Column()
  unique_identifier: string;

  @Column({
    length: 500,
  })
  address: string;

  @Column("date")
  created_at: Date;
}
