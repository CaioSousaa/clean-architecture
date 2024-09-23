import { AppError } from "../../../adapters/errors/app-error";
import { IUserRepository } from "../../ports/IUser-respository";
import { IUpdateUserDTO } from "./dto/IUpdate-user-dto";
import { ITokenRepository } from "../../ports/IToken-repository";
import { validateTokenInput } from "./functions/validate-token-input";
import { bcryptPassword } from "../create-user/functions/bcrypt-password";

export class UpdateUser {
  constructor(
    private userRepository: IUserRepository,
    private tokenRepository: ITokenRepository
  ) {}

  async execute({ id, token, address, email, password }: IUpdateUserDTO) {
    try {
      const userExists = await this.userRepository.findUserById(id);

      if (!userExists) {
        throw new AppError("user does not exist", 404);
      }

      const emailAlreadyExists = await this.userRepository.findUserByEmail(
        email
      );

      if (emailAlreadyExists) {
        throw new AppError("email is already being used by another user", 401);
      }

      const tokenExists = await this.tokenRepository.findToken(token);

      if (!tokenExists) {
        throw new AppError("token does not exist", 404);
      }

      await validateTokenInput(tokenExists, userExists.id);

      const hashPassword = await bcryptPassword(password);

      const mergeUser = await this.userRepository.updateUser(
        userExists.id,
        email,
        hashPassword,
        address
      );

      delete mergeUser.password;

      await this.tokenRepository.updateStatus(token);

      return mergeUser;
    } catch (err) {
      return err;
    }
  }
}
