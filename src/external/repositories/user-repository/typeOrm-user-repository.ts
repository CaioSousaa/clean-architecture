import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../usecases/ports/IUser-respository";
import { AppDataSource } from "../../postgres/data-source";
import { UserEntityDb } from "../../../infra/db/entities/user/user-entity-db";
import { CardBank } from "../../../domain/entities/card-bank";

export class TypeOrmUserRepository implements IUserRepository {
  async updateStatus(id: string): Promise<User> {
    const user = await AppDataSource.getRepository(UserEntityDb).findOneBy({
      id,
    });

    user.status_plan = true;

    const updatedUser = await AppDataSource.getRepository(UserEntityDb).save(
      user
    );

    return updatedUser;
  }

  async addCardBank(id: string, cardBank: CardBank): Promise<User> {
    const user = await AppDataSource.getRepository(UserEntityDb).findOneBy({
      id: id,
    });

    const mergeUser = AppDataSource.getRepository(UserEntityDb).merge(user, {
      card_bank: [cardBank],
    });

    const newUser = await AppDataSource.getRepository(UserEntityDb).save(
      mergeUser
    );

    return newUser;
  }

  async updateUser(
    id: string,
    email?: string,
    password?: string,
    address?: string
  ): Promise<User> {
    const user = await AppDataSource.getRepository(UserEntityDb).findOneBy({
      id: id,
    });

    const mergeUser = AppDataSource.getRepository(UserEntityDb).merge(user, {
      password: password,
      email: email,
      address: address,
    });

    const newUser = await AppDataSource.getRepository(UserEntityDb).save(
      mergeUser
    );

    return newUser;
  }

  async deleteUser(id: string): Promise<void> {
    await AppDataSource.getRepository(UserEntityDb).delete({
      id: id,
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await AppDataSource.getRepository(UserEntityDb).findOneBy({
      email: email,
    });

    return user;
  }

  async findUserById(id: string): Promise<User> {
    const user = await AppDataSource.getRepository(UserEntityDb).findOneBy({
      id: id,
    });

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await AppDataSource.getRepository(UserEntityDb).find();

    return users;
  }

  async uniqueIdenfierAlreadyExists(
    unique_identifier: string
  ): Promise<Boolean> {
    const unique_identifierAlreadyExist = await AppDataSource.getRepository(
      UserEntityDb
    ).findOneBy({
      unique_identifier: unique_identifier,
    });

    return !!unique_identifierAlreadyExist;
  }

  async create({
    first_name,
    surname,
    address,
    age,
    unique_identifier,
    card_bank,
    email,
    status_plan,
    password,
  }: User): Promise<User> {
    const user = AppDataSource.getRepository(UserEntityDb).create({
      first_name,
      surname,
      address,
      age,
      unique_identifier,
      email,
      card_bank,
      password,
      status_plan,
      created_at: new Date(),
    });

    await AppDataSource.getRepository(UserEntityDb).save(user);
    return user;
  }
}
