import { CardBank } from "../../domain/entities/card-bank";
import { User } from "../../domain/entities/user";

export interface IUserRepository {
  create(user: User): Promise<User>;
  uniqueIdenfierAlreadyExists(unique_identifier: string): Promise<Boolean>;
  getAllUsers(): Promise<User[]>;
  findUserById(id: string): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
  deleteUser(id: string): Promise<void>;
  updateUser(
    id: string,
    email?: string,
    password?: string,
    address?: string
  ): Promise<User>;
  addCardBank(id: string, cardBank: CardBank): Promise<User>;
}
