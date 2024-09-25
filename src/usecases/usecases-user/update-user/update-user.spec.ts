require("dotenv").config();
import { IUserRepository } from "../../ports/IUser-respository";
import { User } from "../../../domain/entities/user";
import { ITokenRepository } from "../../ports/IToken-repository";
import { UpdateUser } from "./update-user";
import { CreateUser } from "../create-user/create-user";
import { InMemoryUserRepository } from "../in-memory/in-memory-user-repository";
import { InMemoryTokenRepository } from "../in-memory/in-memory-token";

describe("update user", () => {
  let inMemoryUserRepository: IUserRepository;
  let inMemoryTokenRepository: ITokenRepository;
  let createUser: CreateUser;
  let updateUser: UpdateUser;

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryTokenRepository = new InMemoryTokenRepository();
    createUser = new CreateUser(inMemoryUserRepository);
    updateUser = new UpdateUser(
      inMemoryUserRepository,
      inMemoryTokenRepository
    );
  });

  test("it must be possible to edit a user", async () => {
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

    expect(user).toHaveProperty("address");
    expect(user).toHaveProperty("email");

    const token = await inMemoryTokenRepository.create({
      user_id: user.id,
      used: false,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjcwOTY3MTUsImV4cCI6MTcyNzE4MzExNSwic3ViIjoiNTkyZWRjY2YtZjgxMS00NzM2LWIwYjItMTNjNDZmOTQ3ZGQxIn0.h6tpxIhUd0KvNYocBRO_vGaK67mSm1SazvzvSQPP79g",
      expires_in: 3227183115, //use valid expires in
      created_at: new Date(),
    });

    const userUpdate = await updateUser.execute({
      id: user.id,
      token: token.token,
      email: "girafa@gmail.com",
      password: "Girafa123!",
      address: "Savana Leste, rua pe de jambo",
    });

    expect(userUpdate.email).toBe("girafa@gmail.com");
    expect(userUpdate.address).toBe("Savana Leste, rua pe de jambo");
  });

  test("it should not be possible to change a user with expires in expired", async () => {
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

    const token = await inMemoryTokenRepository.create({
      user_id: user.id,
      used: false,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjcwOTY3MTUsImV4cCI6MTcyNzE4MzExNSwic3ViIjoiNTkyZWRjY2YtZjgxMS00NzM2LWIwYjItMTNjNDZmOTQ3ZGQxIn0.h6tpxIhUd0KvNYocBRO_vGaK67mSm1SazvzvSQPP79g",
      expires_in: 1027183115,
      created_at: new Date(),
    });

    const userUpdate = await updateUser.execute({
      id: user.id,
      token: token.token,
      email: "girafa@gmail.com",
      password: "Girafa123!",
      address: "Savana Leste, rua pe de jambo",
    });

    expect(userUpdate.email).not.toBeDefined();
  });
});
