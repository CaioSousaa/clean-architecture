import { IPlansRepository } from "../ports/IPlans-repository";

export class CreateFixedsPlans {
  constructor(private plansRepository: IPlansRepository) {}
  async execute() {
    const familyPlan = await this.plansRepository.create({
      id: 1,
      price_in_cent: 49990,
      description:
        "Ideal for those who want to protect the entire family. Offers personalized benefits for up to 5 members, with access to priority support and special events",
    });

    const individualPlan = await this.plansRepository.create({
      id: 2,
      price_in_cent: 19990,
      description:
        "Made for those looking to take advantage of all the advantages on their own. Perfect for those who want full control of their benefits and services",
    });

    const goldPlan = await this.plansRepository.create({
      id: 3,
      price_in_cent: 99990,
      description:
        "The most exclusive plan, with premium benefits, VIP service, exclusive events and unlimited access to all advantages offered.",
    });

    return { familyPlan, goldPlan, individualPlan };
  }
}
