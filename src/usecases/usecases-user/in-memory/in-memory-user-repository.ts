import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../ports/IUser-respository";
import { v4 as uuid } from "uuid";

export class InMemoryUserRepository implements IUserRepository {
  async findUserByEmail(email: string): Promise<User> {
    const userByEmail = this.users.find((e) => e.email === email);

    return userByEmail;
  }
  async deleteUser(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
  }

  private users: User[] = [];
  async create(user: User): Promise<User> {
    Object.assign(user, {
      id: uuid(),
    });

    this.users.push(user);

    return user;
  }

  async uniqueIdenfierAlreadyExists(
    unique_identifier: string
  ): Promise<Boolean> {
    const uniqueIdentifierAlreadyExists = this.users.some(
      (e) => e.unique_identifier === unique_identifier
    );

    return uniqueIdentifierAlreadyExists;
  }

  async getAllUsers(): Promise<User[]> {
    const users = this.users.map((team) => {
      return team;
    });

    return users;
  }

  async findUserById(id: string): Promise<User> {
    const userById = this.users.find((e) => e.id === id);

    return userById;
  }
}
