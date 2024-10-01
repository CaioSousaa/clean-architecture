import { IPlansRepository } from "../../../ports/IPlans-repository";
import { InMemoryCreateFixedPlan } from "../../in-memory/in-memory-create-fixed-plan";
import { CreateFixedsPlans } from "../create-plans/create-fixed-plans";
import { GetPlansUseCase } from "./get-plans";

describe("get-plans", () => {
  let inMemoryRepository: IPlansRepository;
  let createFixedPlans: CreateFixedsPlans;
  let getPlans: GetPlansUseCase;

  beforeAll(() => {
    inMemoryRepository = new InMemoryCreateFixedPlan();
    createFixedPlans = new CreateFixedsPlans(inMemoryRepository);
    getPlans = new GetPlansUseCase(inMemoryRepository);
  });

  test("it should be possible to return the 3 plans", async () => {
    await createFixedPlans.execute();

    const plans = await getPlans.execute();

    expect(plans).toHaveLength(3);
  });
});
