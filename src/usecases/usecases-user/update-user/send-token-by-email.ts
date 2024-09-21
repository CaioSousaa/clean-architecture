import { SendEmailUser } from "../../mail/send-email-user";
import { expiresIn } from "./functions/expires-in";
import { GenerateToken } from "./generate-token";
import { ITokenRepository } from "../../ports/IToken-repository";
import { IUserRepository } from "../../ports/IUser-respository";
import { AppError } from "../../../adapters/errors/app-error";
import { Token } from "../../../domain/entities/token";

export class SendTokenByEmail {
  constructor(
    private sendToken: SendEmailUser,
    private tokenRepository: ITokenRepository,
    private generateToken: GenerateToken,
    private userRepositoy: IUserRepository
  ) {}

  async execute(id: string) {
    try {
      const user = await this.userRepositoy.findUserById(id);

      if (!user) {
        throw new AppError("user does not exist", 404);
      }

      const generateToken = await this.generateToken.execute(id);

      const expires_in = expiresIn();

      const token: Token = Token.create({
        user_id: user.id,
        used: false,
        expires_in: expires_in,
        token: generateToken,
        created_at: new Date(),
      });

      const createTokenAcess = await this.tokenRepository.create(token);

      await this.sendToken.execute(user, createTokenAcess.token);

      return createTokenAcess;
    } catch (err) {
      return err;
    }
  }
}
