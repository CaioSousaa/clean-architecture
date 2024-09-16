import { compare } from "bcrypt";
import { AppError } from "../../../../adapters/errors/app-error";

export async function comparePassword(
  passwordRequest: string,
  userPassword: string
) {
  const passwordMatch = await compare(passwordRequest, userPassword);

  if (!passwordMatch) {
    throw new AppError("Email or password incorrect!!!", 404);
  }
}
