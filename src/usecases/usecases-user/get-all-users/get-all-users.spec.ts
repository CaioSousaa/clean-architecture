require("dotenv").config();
import { User } from "../../../domain/entities/user";
import { CreateUser } from "../create-user/create-user";
import { GetAllUsers } from "./get-all-users";
import { IUserRepository } from "../../ports/IUser-respository";
import { InMemoryUserRepository } from "../in-memory/in-memory-user-repository";

describe("get-all-users", () => {
  let inMemory: IUserRepository;
  let createUser: CreateUser;
  let getAllUsers: GetAllUsers;

  beforeEach(() => {
    inMemory = new InMemoryUserRepository();
    createUser = new CreateUser(inMemory);
    getAllUsers = new GetAllUsers(inMemory);
  });

  it("should return all users", async () => {
    const userDate: User = {
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

    await createUser.execute(userDate);

    const result = await getAllUsers.execute();
    const users = result.users || [];

    expect(users).toHaveLength(1);
  });
});
