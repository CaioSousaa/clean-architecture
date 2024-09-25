import { User } from "../../../domain/entities/user";
import { CardBankEntityDb } from "../../../infra/db/entities/card-bank/card-bank-entity-db";
import { IUserRepository } from "../../ports/IUser-respository";
import { v4 as uuid } from "uuid";

export class InMemoryUserRepository implements IUserRepository {
  async addCardBank(id: string, cardBank: CardBankEntityDb): Promise<User> {
    const user = this.users.find((u) => u.id === id);

    user.card_bank = [cardBank];
    return user;
  }

  private users: User[] = [];
  async updateUser(
    id: string,
    email?: string,
    password?: string,
    address?: string
  ): Promise<User> {
    const user = this.users.find((u) => u.id === id);

    user.email = email;
    user.password = password;
    user.address = address;

    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const userByEmail = this.users.find((e) => e.email === email);

    return userByEmail;
  }
  async deleteUser(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
  }
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
