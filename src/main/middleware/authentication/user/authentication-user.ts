import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../../usecases/ports/IUser-respository";
import { AppError } from "../../../../adapters/errors/app-error";
import { sign } from "jsonwebtoken";
import { IRequest } from "./interfaces/IRequest";
import { IResponse } from "./interfaces/IResponse";
import { comparePassword } from "./compare-password";

@injectable()
export class AuthenticateUser {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!!!", 404);
    }

    comparePassword(password, user.password);

    const token = sign({}, "ac81d22ce6aa0f7cf1b1e38f74c02957", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        first_name: user.first_name,
        email: user.email,
      },
    };

    return tokenReturn;
  }
}
