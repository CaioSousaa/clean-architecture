import { RegisterPlan } from "../../domain/entities/register-plan";

export interface IRegisterPlansRepository {
  create(registerPlan: RegisterPlan): Promise<RegisterPlan>;
  getAll(): Promise<RegisterPlan[]>;
  removePlan(user_id: string): Promise<void>;
}
