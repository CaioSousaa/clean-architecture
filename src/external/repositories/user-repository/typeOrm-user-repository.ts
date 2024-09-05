import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../usecases/ports/IUser-respository";
import { AppDataSource } from "../../postgres/data-source";
import { UserEntityDb } from "../../../infra/db/entities/user/user";

export class TypeOrmUserRepository implements IUserRepository {
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
  }: User): Promise<User> {
    const user = AppDataSource.getRepository(UserEntityDb).create({
      first_name,
      surname,
      address,
      age,
      unique_identifier,
      created_at: new Date(),
    });

    await AppDataSource.getRepository(UserEntityDb).save(user);
    return user;
  }
}
