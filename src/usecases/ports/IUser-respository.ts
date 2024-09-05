import { User } from "../../domain/entities/user";

export interface IUserRepository {
  create(user: User): Promise<User>;
  uniqueIdenfierAlreadyExists(unique_identifier: string): Promise<Boolean>;
}
