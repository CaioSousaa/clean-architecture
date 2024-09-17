import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import { TypeOrmUserRepository } from "../../external/repositories/user-repository/typeOrm-user-repository";
import { AppError } from "../../adapters/errors/app-error";
interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: id } = verify(
      token,
      "ac81d22ce6aa0f7cf1b1e38f74c02957"
    ) as IPayload;

    const userRepository = new TypeOrmUserRepository();

    const user = await userRepository.findUserById(id);

    if (!user) {
      throw new AppError("user does not exist", 401);
    }
    next();
  } catch (error) {
    throw new AppError("invalid token", 401);
  }
}
