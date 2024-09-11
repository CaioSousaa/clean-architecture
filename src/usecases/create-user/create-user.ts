import { AppError } from "../../adapters/errors/app-error";
import { IUserRepository } from "../ports/IUser-respository";
import { User } from "../../domain/entities/user";
import { validateUniqueIdentifierFunction } from "./functions/validate-unique_identifier-function";
import { CreateUserDTO } from "./dto/create-user-dto";
import { bcryptPassword } from "./functions/bcrypt-password";
import { validPasswordFunction } from "./functions/valid-password";
import { validEmailFunction } from "./functions/valid-email";

export class CreateUser {
  constructor(private userRepository: IUserRepository) {}
  async execute({
    address,
    age,
    email,
    first_name,
    password,
    surname,
    unique_identifier,
  }: CreateUserDTO) {
    try {
      const cpf = validateUniqueIdentifierFunction(unique_identifier);

      if (!cpf) {
        throw new AppError(
          "we're sorry, but the unique identifier is invalid",
          401
        );
      }

      if (!validEmailFunction(email)) {
        throw new AppError(
          "the email must meet the format: xxxx@gmail.com",
          401
        );
      }

      if (!validPasswordFunction(password)) {
        throw new AppError(
          "the password must contain: Lowercase and uppercase letters, numbers and symbols",
          401
        );
      }

      const uniqueIdentifer =
        await this.userRepository.uniqueIdenfierAlreadyExists(
          unique_identifier
        );

      if (uniqueIdentifer) {
        throw new AppError(
          "unique identifier is already being used by another user",
          401
        );
      }

      const newPasswordBcrypt = await bcryptPassword(password);

      const user: User = User.create({
        address,
        age,
        unique_identifier,
        first_name,
        surname,
        card_bank: null,
        email,
        password: newPasswordBcrypt,
        status_plan: false,
        created_at: new Date(),
      });

      const createUser = await this.userRepository.create(user);

      delete createUser.password;

      return createUser;
    } catch (err) {
      return err;
    }
  }
}
