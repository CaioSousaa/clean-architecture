require("dotenv").config();
import { User } from "../../../domain/entities/user";
import { CreateUser } from "./create-user";
import { IUserRepository } from "../../ports/IUser-respository";

jest.mock("../in-memory/in-memory-user-repository");

describe("create-user", () => {
  let inMemoryUserRepository: jest.Mocked<IUserRepository>;
  let createUserUseCase: CreateUser;

  beforeEach(() => {
    const {
      InMemoryUserRepository,
    } = require("../in-memory/in-memory-user-repository");
    inMemoryUserRepository =
      new InMemoryUserRepository() as jest.Mocked<IUserRepository>;
    createUserUseCase = new CreateUser(inMemoryUserRepository);
  });

  it("it must be possible to create a user with all valid fields", async () => {
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

    const mockUserResponse = {
      ...userData,
      id: "some-id",
    };

    inMemoryUserRepository.create.mockResolvedValue(mockUserResponse);

    const user = await createUserUseCase.execute(userData);

    expect(user).toHaveProperty("first_name");
    expect(user).toHaveProperty("surname");
    expect(user).toHaveProperty("age");
    expect(user).toHaveProperty("status_plan");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("unique_identifier");

    expect(inMemoryUserRepository.create).toHaveReturned();
    expect(inMemoryUserRepository.create).toHaveBeenCalled();
    expect(inMemoryUserRepository.create).not.toBeFalsy();
  });

  it("it should not be possible to create a user with a unique identifier that does not comply with", async () => {
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
      unique_identifier: "23087625590",
    };

    inMemoryUserRepository.uniqueIdenfierAlreadyExists.mockResolvedValue(false);

    const response = await createUserUseCase.execute(userData);

    expect(response).toEqual({
      description: "we're sorry, but the unique identifier is invalid",
      statusCode: 400,
    });
  });

  it("it should not be possible to create a user with a non-standard email", async () => {
    const userData: User = {
      first_name: "Joe",
      surname: "Doe",
      address: "Rua teste 123 Brasil",
      age: 23,
      card_bank: null,
      created_at: new Date(),
      status_plan: false,
      email: "emailtestgmail.com",
      password: "Test!1",
      unique_identifier: process.env.VALID_CPF,
    };

    inMemoryUserRepository.uniqueIdenfierAlreadyExists.mockResolvedValue(false);

    const response = await createUserUseCase.execute(userData);

    expect(response).toEqual({
      description: "the email must meet the format: xxxx@gmail.com",
      statusCode: 400,
    });
  });

  it("should not be possible to create a user with the same unique identifier", async () => {
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

    inMemoryUserRepository.uniqueIdenfierAlreadyExists.mockResolvedValueOnce(
      false
    );
    inMemoryUserRepository.uniqueIdenfierAlreadyExists.mockResolvedValueOnce(
      true
    );

    await createUserUseCase.execute(userData);

    const result = await createUserUseCase
      .execute(userData)
      .catch((err) => err);

    expect(result).toEqual({
      description: "unique identifier is already being used by another user",
      statusCode: 401,
    });
  });
});
