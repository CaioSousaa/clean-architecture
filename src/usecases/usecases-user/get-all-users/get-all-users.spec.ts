require("dotenv").config();
import { User } from "../../../domain/entities/user";
import { CreateUser } from "../create-user/create-user";
import { GetAllUsers } from "./get-all-users";
import { IUserRepository } from "../../ports/IUser-respository";

jest.mock("../in-memory/in-memory-user-repository");

describe("get-all-users", () => {
  let inMemoryUserRepository: jest.Mocked<IUserRepository>;
  let createUser: CreateUser;
  let getAllUsers: GetAllUsers;

  beforeEach(() => {
    const {
      InMemoryUserRepository,
    } = require("../in-memory/in-memory-user-repository");
    inMemoryUserRepository =
      new InMemoryUserRepository() as jest.Mocked<IUserRepository>;
    createUser = new CreateUser(inMemoryUserRepository);
    getAllUsers = new GetAllUsers(inMemoryUserRepository);
  });

  it("should mock the creation of a user and retrieving all users", async () => {
    const mockUserData: User = {
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

    const mockUserResponse = { ...mockUserData, id: "some-id" };

    inMemoryUserRepository.create.mockResolvedValue(mockUserResponse);

    inMemoryUserRepository.getAllUsers.mockResolvedValue([mockUserResponse]);

    const createdUser = await createUser.execute(mockUserData);
    expect(inMemoryUserRepository.create).toHaveBeenCalledTimes(1);
    expect(createdUser).toEqual(mockUserResponse);

    const result = await getAllUsers.execute();
    const users = result.users;

    expect(inMemoryUserRepository.getAllUsers).toHaveBeenCalledTimes(1);
    expect(users).toEqual([mockUserResponse]);

    expect(users).toHaveLength(1);
    expect(users[0]).toHaveProperty("first_name", "Joe");
    expect(users[0]).toHaveProperty("email", "emailtest@gmail.com");
  });

  it("should return an empty list if no users exist", async () => {
    inMemoryUserRepository.getAllUsers.mockResolvedValue([]);

    const result = await getAllUsers.execute();
    const users = result.users;

    expect(inMemoryUserRepository.getAllUsers).toHaveBeenCalledTimes(1);
    expect(users).toEqual([]);
    expect(users).toHaveLength(0);
  });
});
