import { RegisterPlan } from "../../../domain/entities/register-plan";
import { RegisterPlanEntityDb } from "../../../infra/db/entities/register-plan/register-plan-entity-db";
import { IRegisterPlansRepository } from "../../../usecases/ports/IRegister-plan";
import { AppDataSource } from "../../postgres/data-source";

export class TypeOrmRegisterPlanRepository implements IRegisterPlansRepository {
  async create({ user_id, plan_id }: RegisterPlan): Promise<RegisterPlan> {
    const registerPlan = AppDataSource.getRepository(
      RegisterPlanEntityDb
    ).create({
      user_id,
      plan_id,
    });

    const saveRegisterPlan = await AppDataSource.getRepository(
      RegisterPlanEntityDb
    ).save(registerPlan);

    return saveRegisterPlan;
  }

  async getAll(): Promise<RegisterPlan[]> {
    const getAllPlans = await AppDataSource.getRepository(
      RegisterPlanEntityDb
    ).find();

    return getAllPlans;
  }

  async removePlan(user_id: string): Promise<void> {
    await AppDataSource.getRepository(RegisterPlanEntityDb).delete({
      user_id: user_id,
    });
  }
}
