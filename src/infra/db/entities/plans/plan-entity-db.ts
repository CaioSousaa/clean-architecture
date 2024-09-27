import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("plan")
export class PlanEntityDb extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  price_in_cent: number;

  @Column()
  description: string;
}
