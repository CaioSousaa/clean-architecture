require("dotenv").config();
import { InMemoryCreateFixedPlan } from "../../plans/in-memory/in-memory-create-fixed-plan";
import { ICardBankRepository } from "../../ports/ICard-bank-repository";
import { IPlansRepository } from "../../ports/IPlans-repository";
import { IRegisterPlansRepository } from "../../ports/IRegister-plan";
import { IUserRepository } from "../../ports/IUser-respository";
import { InMemoryCardBankRepository } from "../../usecases-user/in-memory/in-memory-card-bank-repository";
import { InMemoryUserRepository } from "../../usecases-user/in-memory/in-memory-user-repository";
import { CreateRegisterPlan } from "./create-register-plan";
import { InMemoryRegisterPlan } from "../in-memory/in-memory-register-plan";
import { CreateUser } from "../../usecases-user/create-user/create-user";
import { User } from "../../../domain/entities/user";
import { RegisterCardBank } from "../../usecases-user/register-card-bank/register-card-bank";
import { RegisterPlan } from "../../../domain/entities/register-plan";
import { CreateFixedsPlans } from "../../plans/usecases/create-plans/create-fixed-plans";

describe("create-register-plan", () => {
  let inMemoryUserRepository: IUserRepository;
  let inMemoryCardBank: ICardBankRepository;
  let inMemoryFixedPlan: IPlansRepository;
  let inMemoryRegisterPlan: IRegisterPlansRepository;
  let createRegisterPlan: CreateRegisterPlan;
  let createUser: CreateUser;
  let registerCardBank: RegisterCardBank;
  let fixedPlans: CreateFixedsPlans;

  beforeAll(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryCardBank = new InMemoryCardBankRepository();
    inMemoryFixedPlan = new InMemoryCreateFixedPlan();
    inMemoryRegisterPlan = new InMemoryRegisterPlan();
    createUser = new CreateUser(inMemoryUserRepository);
    fixedPlans = new CreateFixedsPlans(inMemoryFixedPlan);
    registerCardBank = new RegisterCardBank(
      inMemoryUserRepository,
      inMemoryCardBank
    );
    createRegisterPlan = new CreateRegisterPlan(
      inMemoryUserRepository,
      inMemoryRegisterPlan,
      inMemoryCardBank,
      inMemoryFixedPlan
    );
  });

  test("a user must be able to register a plan", async () => {
    const userData: User = {
      first_name: "Joe",
      surname: "Doe",
      address: "Rua teste 123 Brasil",
      age: 23,
      card_bank: null,
      created_at: new Date(),
      status_plan: false,
      email: "emailtest@gmail.com",
      password: "Test!1",
      unique_identifier: process.env.VALID_CPF,
    };

    const user = await createUser.execute(userData);

    await registerCardBank.execute({
      cvv: 103,
      user_id: user.id,
      validaty: "10/2030",
      number_card: 8126900317893125,
    });

    const plan = await fixedPlans.execute();

    const createRecordPlanData: RegisterPlan = {
      plan_id: plan.individualPlan.id,
      user_id: user.id,
    };

    const createRecordPlan = await createRegisterPlan.execute(
      createRecordPlanData,
      49990
    );

    expect(createRecordPlan).toHaveProperty("plan_id");
    expect(createRecordPlan).toHaveProperty("user_id");
    expect(createRecordPlan).toHaveProperty("id");
  });
});
