import { IPlansRepository } from "../../../ports/IPlans-repository";
import { InMemoryCreateFixedPlan } from "../../in-memory/in-memory-create-fixed-plan";
import { CreateFixedsPlans } from "../create-plans/create-fixed-plans";
import { FindPlanByIdUseCase } from "./find-plan-by-id";

describe("find-plan-by-id", () => {
  let inMemoryRepository: IPlansRepository;
  let createFixedPlans: CreateFixedsPlans;
  let findById: FindPlanByIdUseCase;

  beforeAll(() => {
    inMemoryRepository = new InMemoryCreateFixedPlan();
    createFixedPlans = new CreateFixedsPlans(inMemoryRepository);
    findById = new FindPlanByIdUseCase(inMemoryRepository);
  });

  test("it must be possible to return the plan searched for by its id", async () => {
    await createFixedPlans.execute();

    const id = 1;

    const plan = await findById.execute({ id });

    expect(plan).toHaveProperty("id");
    expect(plan).toHaveProperty("description");
    expect(plan).toHaveProperty("price_in_cent");

    expect(plan).toMatchObject({
      id: 1,
      price_in_cent: 49990,
      description:
        "Ideal for those who want to protect the entire family. Offers personalized benefits for up to 5 members, with access to priority support and special events",
    });
  });

  test("should return an error message if the plan id is invalid", async () => {
    await createFixedPlans.execute();

    const id = 5;

    const plan = await findById.execute({ id });

    expect(plan).toEqual({
      description: "plan id is not valid",
      statusCode: 404,
    });
  });
});
