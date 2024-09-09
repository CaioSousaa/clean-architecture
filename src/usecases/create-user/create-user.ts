import { AppError } from "../../adapters/errors/app-error";
import { IUserRepository } from "../ports/IUser-respository";
import { User } from "../../domain/entities/user";
import { validateUniqueIdentifierFunction } from "./functions/validate-unique_identifier-function";
import { CreateUserDTO } from "./dto/create-user-dto";

export class CreateUser {
  constructor(private userRepository: IUserRepository) {}
  async execute({
    address,
    age,
    email,
    first_name,
    password,
    status_plan,
    surname,
    unique_identifier,
  }: CreateUserDTO) {
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
      card_bank: null,
      email,
      password,
      status_plan: false,
      created_at: new Date(),
    });

    const createUser = await this.userRepository.create(user);

    return createUser;
  }
}
