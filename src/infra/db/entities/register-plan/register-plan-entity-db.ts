import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum PlanType {
  FAMILY = 1,
  INDIVIDUAL = 2,
  GOLD = 3,
}

@Entity("register-plan")
export class RegisterPlanEntityDb {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @Column({
    type: "enum",
    enum: PlanType,
  })
  plan_id: PlanType;
}
