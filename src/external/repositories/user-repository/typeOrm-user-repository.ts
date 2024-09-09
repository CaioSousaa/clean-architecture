import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../usecases/ports/IUser-respository";
import { AppDataSource } from "../../postgres/data-source";
import { UserEntityDb } from "../../../infra/db/entities/user/user-entity-db";

export class TypeOrmUserRepository implements IUserRepository {
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
