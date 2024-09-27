import { Plans } from "../../../domain/entities/plans";
import { PlanEntityDb } from "../../../infra/db/entities/plans/plan-entity-db";
import { IPlansRepository } from "../../../usecases/ports/IPlans-repository";
import { AppDataSource } from "../../postgres/data-source";

export class TypeOrmPlansRepository implements IPlansRepository {
  async create({ id, price_in_cent, description }: Plans): Promise<Plans> {
    const plan = AppDataSource.getRepository(PlanEntityDb).create({
      id: id,
      price_in_cent: price_in_cent,
      description: description,
    });

    const createdPlan = await AppDataSource.getRepository(PlanEntityDb).save(
      plan
    );

    return createdPlan;
  }
}
