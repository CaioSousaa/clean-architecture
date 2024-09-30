import { Plans } from "../../../domain/entities/plans";
import { IPlansRepository } from "../../ports/IPlans-repository";

export class InMemoryCreateFixedPlan implements IPlansRepository {
  private plans: Plans[] = [];
  async create(plan: Plans): Promise<Plans> {
    this.plans.push(plan);

    return plan;
  }

  async findById(plan_id: number): Promise<Plans> {
    const plan = this.plans.find((e) => e.id === plan_id);

    return plan;
  }
  async findPlans(): Promise<Plans[]> {
    const plans = this.plans.map((plan) => {
      return plan;
    });

    return plans;
  }
}
