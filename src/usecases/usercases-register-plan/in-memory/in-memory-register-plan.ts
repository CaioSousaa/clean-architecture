import { RegisterPlan } from "../../../domain/entities/register-plan";
import { IRegisterPlansRepository } from "../../ports/IRegister-plan";
import { v4 as uuid } from "uuid";

export class InMemoryRegisterPlan implements IRegisterPlansRepository {
  private registerPlan: RegisterPlan[] = [];

  async create(registerPlan: RegisterPlan): Promise<RegisterPlan> {
    Object.assign(registerPlan, {
      id: uuid(),
    });

    this.registerPlan.push(registerPlan);

    return registerPlan;
  }

  async getAll(): Promise<RegisterPlan[]> {
    const records = this.registerPlan.map((r) => {
      return r;
    });

    return records;
  }

  async removePlan(user_id: string): Promise<void> {
    const remove = this.registerPlan.findIndex((e) => e.user_id === user_id);

    this.registerPlan.splice(remove, 1);
  }
}
