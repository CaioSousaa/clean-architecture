import { AppError } from "../../adapters/errors/app-error";
import { IUserRepository } from "../ports/IUser-respository";
import { ICreateUserDTO } from "./dto/ICreate-user-DTO";
import { User } from "../../domain/entities/user";
import { validateUniqueIdentifierFunction } from "./functions/validate-unique_identifier-function";

export class CreateUser {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    address,
    age,
    first_name,
    surname,
    unique_identifier,
  }: ICreateUserDTO) {
    const cpf = validateUniqueIdentifierFunction(unique_identifier);

    if (!cpf) {
      throw new AppError(
        "we're sorry, but the unique identifier is invalid",
        401
      );
    }

    const uniqueIdentifer =
      await this.userRepository.uniqueIdenfierAlreadyExists(unique_identifier);

    if (uniqueIdentifer) {
      throw new AppError(
        "unique identifier is already being used by another user",
        401
      );
    }

    const user: User = User.create({
      address,
      age,
      unique_identifier,
      first_name,
      surname,
      created_at: new Date(),
    });

    const createUser = await this.userRepository.create(user);

    return createUser;
  }
}
