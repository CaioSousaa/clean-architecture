import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("plans")
export class PlansEntityDb extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  price_in_cent: number;

  @Column()
  description: string;
}
