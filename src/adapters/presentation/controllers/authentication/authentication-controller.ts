import { Request, Response } from "express";
import { AuthenticateUser } from "../../../../main/middleware/authentication/user/authentication-user";
import { container } from "tsyringe";

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authUser = container.resolve(AuthenticateUser);

    const token = await authUser.execute({ email, password });

    return res.json(token);
  }
}
