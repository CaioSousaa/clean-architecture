import { TypeOrmUserRepository } from "../../external/repositories/user-repository/typeOrm-user-repository";
import { TypeOrmCreateTokenRepository } from "../../external/repositories/token/typeOrm-create-token";
import { SendEmailUser } from "../../usecases/mail/send-email-user";
import { GenerateToken } from "../../usecases/usecases-user/update-user/generate-token";
import { SendTokenByEmail } from "../../usecases/usecases-user/update-user/send-token-by-email";
import { SendTokenByEmailController } from "../../adapters/presentation/controllers/send-token-by-email/send-token-by-email-controller";

export const sendTokenAcessByEmail = () => {
  const userRepositoy = new TypeOrmUserRepository();
  const tokenRepository = new TypeOrmCreateTokenRepository();
  const sendEmail = new SendEmailUser();
  const generateToken = new GenerateToken();
  const sendTokenByEmail = new SendTokenByEmail(
    sendEmail,
    tokenRepository,
    generateToken,
    userRepositoy
  );
  const sendTokenByEmailController = new SendTokenByEmailController(
    sendTokenByEmail
  );

  return sendTokenByEmailController;
};
