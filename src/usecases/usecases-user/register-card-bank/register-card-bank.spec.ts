require("dotenv").config();
import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../ports/IUser-respository";
import { ICardBankRepository } from "../../ports/ICard-bank-repository";
import { RegisterCardBank } from "./register-card-bank";
import { InMemoryCardBankRepository } from "../in-memory/in-memory-card-bank-repository";
import { InMemoryUserRepository } from "../in-memory/in-memory-user-repository";
import { CreateUser } from "../create-user/create-user";

describe("register-card-bank", () => {
  let inMemoryUserRepository: IUserRepository;
  let inMemoryCardBankRepository: ICardBankRepository;
  let registerCardBank: RegisterCardBank;
  let createUser: CreateUser;

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryCardBankRepository = new InMemoryCardBankRepository();

    createUser = new CreateUser(inMemoryUserRepository);
    registerCardBank = new RegisterCardBank(
      inMemoryUserRepository,
      inMemoryCardBankRepository
    );
  });

  test("a user must be able to register a card", async () => {
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

    const cardBank = await registerCardBank.execute({
      user_id: user.id,
      cvv: 104,
      validaty: "08/30",
      number_card: 83478173112398,
    });

    expect(cardBank).toBeDefined();
    expect(cardBank.cvv).toBe(104);
    expect(cardBank.user.id).toEqual(user.id);
  });

  test("it should not be allowed to register a card without a user", async () => {
    const cardBank = await registerCardBank.execute({
      user_id: "87137",
      cvv: 104,
      validaty: "08/30",
      number_card: 83478173112398,
    });

    expect(cardBank).toEqual({
      description: "user not found",
      statusCode: 400,
    });
  });
});
