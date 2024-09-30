import { Plans } from "../../domain/entities/plans";

export interface IPlansRepository {
  create(plan: Plans): Promise<Plans>;
  findById(plan_id: number): Promise<Plans>;
  findPlans(): Promise<Plans[]>;
}
