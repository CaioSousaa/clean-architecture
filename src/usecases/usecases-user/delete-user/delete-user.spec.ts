require("dotenv").config();
import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../ports/IUser-respository";
import { CreateUser } from "../create-user/create-user";
import { DeleteUserUseCase } from "../delete-user/delete-user";

jest.mock("../in-memory/in-memory-user-repository");

describe("delete-user", () => {
  let inMemoryUserRepository: jest.Mocked<IUserRepository>;
  let createUser: CreateUser;
  let deleteUser: DeleteUserUseCase;

  beforeEach(() => {
    const {
      InMemoryUserRepository,
    } = require("../in-memory/in-memory-user-repository");
    inMemoryUserRepository =
      new InMemoryUserRepository() as jest.Mocked<IUserRepository>;
    createUser = new CreateUser(inMemoryUserRepository);
    deleteUser = new DeleteUserUseCase(inMemoryUserRepository);
  });

  it("should be possible to delete a user", async () => {
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
      unique_identifier: process.env.VALID_CPF!,
    };

    const user = await createUser.execute(userData);

    await deleteUser.execute({ id: user.id });

    const userExists = await inMemoryUserRepository.findUserById(user.id);

    expect(userExists).toBeFalsy();
  });
});
