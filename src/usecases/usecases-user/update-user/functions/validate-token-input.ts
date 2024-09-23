import { AppError } from "../../../../adapters/errors/app-error";
import { Token } from "../../../../domain/entities/token";

export async function validateTokenInput(token: Token, userId: string) {
  if (token.used === true) {
    throw new AppError("token has already been used", 406);
  }

  if (token.user_id !== userId) {
    throw new AppError("token belongs to another user", 401);
  }

  if (token.expires_in < Math.floor(Date.now() / 1000)) {
    throw new AppError("the usage time has expired", 406);
  }
}
