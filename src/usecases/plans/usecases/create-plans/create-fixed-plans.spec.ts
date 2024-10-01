import { Plans } from "../../../../domain/entities/plans";
import { IPlansRepository } from "../../../ports/IPlans-repository";
import { InMemoryCreateFixedPlan } from "../../in-memory/in-memory-create-fixed-plan";
import { CreateFixedsPlans } from "./create-fixed-plans";

describe("create-fixed-plans", () => {
  let inMemoryRepository: IPlansRepository;
  let createFixedPlans: CreateFixedsPlans;

  beforeAll(() => {
    inMemoryRepository = new InMemoryCreateFixedPlan();
    createFixedPlans = new CreateFixedsPlans(inMemoryRepository);
  });

  test("it should be possible to create 3 fixed plans", async () => {
    const familyPlan = (await createFixedPlans.execute()).familyPlan;
    const goldPlan = (await createFixedPlans.execute()).goldPlan;
    const individualPlan = (await createFixedPlans.execute()).individualPlan;

    expect(familyPlan).toBeDefined();
    expect(goldPlan).toBeDefined();
    expect(individualPlan).toBeDefined();
  });

  test("once created, the tests must return their information", async () => {
    const familyPlan = (await createFixedPlans.execute()).familyPlan;
    const goldPlan = (await createFixedPlans.execute()).goldPlan;
    const individualPlan = (await createFixedPlans.execute()).individualPlan;

    expect(familyPlan.description).toEqual(
      "Ideal for those who want to protect the entire family. Offers personalized benefits for up to 5 members, with access to priority support and special events"
    );
    expect(familyPlan.price_in_cent).toEqual(49990);

    expect(individualPlan.description).toEqual(
      "Made for those looking to take advantage of all the advantages on their own. Perfect for those who want full control of their benefits and services"
    );
    expect(individualPlan.price_in_cent).toEqual(19990);

    expect(goldPlan.description).toEqual(
      "The most exclusive plan, with premium benefits, VIP service, exclusive events and unlimited access to all advantages offered."
    );
    expect(goldPlan.price_in_cent).toEqual(99990);
  });
});
