import { User } from "../../../domain/entities/user";
import { FindUserByIdUseCase } from "./find-user-by-id";
import { IUserRepository } from "../../ports/IUser-respository";
import { CreateUser } from "../create-user/create-user";

jest.mock("../in-memory/in-memory-user-repository");

describe("find-user-by-id", () => {
  let inMemoryUserRepository: jest.Mocked<IUserRepository>;
  let createUser: CreateUser;
  let findUserById: FindUserByIdUseCase;

  beforeEach(() => {
    const {
      InMemoryUserRepository,
    } = require("../in-memory/in-memory-user-repository");
    inMemoryUserRepository =
      new InMemoryUserRepository() as jest.Mocked<IUserRepository>;
    createUser = new CreateUser(inMemoryUserRepository);
    findUserById = new FindUserByIdUseCase(inMemoryUserRepository);
  });

  test("it must be possible to return the created user by searching for its id", async () => {
    const userData: User = {
      id: "079a9687-42df-416a-97b7-8e64239eaaef",
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

    inMemoryUserRepository.create.mockResolvedValue(userData);
    inMemoryUserRepository.findUserById.mockResolvedValue(userData);

    await createUser.execute(userData);

    const findUser = await findUserById.execute({ id: userData.id });

    expect(findUser).toEqual(userData);
    expect(inMemoryUserRepository.findUserById).toHaveBeenCalledWith(
      userData.id
    );
  });
});
