import { UpdateUser } from "../../../../usecases/usecases-user/update-user/update-user";
import { Request, Response } from "express";

export class UpdateUserController {
  constructor(private updateUser: UpdateUser) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { email, password, address, token } = req.body;

    const updateUser = await this.updateUser.execute({
      id,
      email,
      password,
      address,
      token,
    });

    res.status(201).json(updateUser);
  }
}
