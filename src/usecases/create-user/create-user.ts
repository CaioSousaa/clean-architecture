import { AppError } from "../../adapters/errors/app-error";
import { IUserRepository } from "../ports/IUser-respository";
import { User } from "../../domain/entities/user";
import { validateUniqueIdentifierFunction } from "./functions/validate-unique_identifier-function";
import { UserValidationDTO } from "./user-validation-dto";

export class CreateUser {
  constructor(private userRepository: IUserRepository) {}
  async execute(parseData: UserValidationDTO) {
    const cpf = validateUniqueIdentifierFunction(parseData.unique_identifier);

    if (!cpf) {
      throw new AppError(
        "we're sorry, but the unique identifier is invalid",
        401
      );
    }

    const uniqueIdentifer =
      await this.userRepository.uniqueIdenfierAlreadyExists(
        parseData.unique_identifier
      );

    if (uniqueIdentifer) {
      throw new AppError(
        "unique identifier is already being used by another user",
        401
      );
    }

    const user: User = User.create({
      address: parseData.address,
      age: parseData.age,
      unique_identifier: parseData.unique_identifier,
      first_name: parseData.first_name,
      surname: parseData.surname,
      card_bank: null,
      email: parseData.email,
      password: parseData.password,
      status_plan: parseData.status_plan,
      created_at: new Date(),
    });

    const createUser = await this.userRepository.create(user);

    return createUser;
  }
}
