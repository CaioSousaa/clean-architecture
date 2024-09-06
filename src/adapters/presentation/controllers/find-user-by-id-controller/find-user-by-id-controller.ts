import { FindUserByIdUseCase } from "../../../../usecases/find-by-id/find-user-by-id";
import { Request, Response } from "express";

export class FindUserByIdController {
  constructor(private findUserById: FindUserByIdUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const user = await this.findUserById.execute({ id });

    res.status(200).json(user);
  }
}
