import { IPlansRepository } from "../../../ports/IPlans-repository";

export class GetPlansUseCase {
  constructor(private plansRepository: IPlansRepository) {}

  async execute() {
    const plans = await this.plansRepository.findPlans();

    return plans;
  }
}
