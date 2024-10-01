import { AppError } from "../../../../adapters/errors/app-error";
import { IPlansRepository } from "../../../ports/IPlans-repository";
import { IIdPlan } from "./dto/IId-plan";

export class FindPlanByIdUseCase {
  constructor(private planRepository: IPlansRepository) {}

  async execute({ id }: IIdPlan) {
    try {
      const plan = await this.planRepository.findById(id);

      if (!plan) {
        throw new AppError("plan id is not valid", 404);
      }

      return plan;
    } catch (err) {
      return err;
    }
  }
}
