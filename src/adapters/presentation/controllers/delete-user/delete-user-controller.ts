import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../../../usecases/usecases-user/delete-user/delete-user";

export class DeleteUserController {
  constructor(private deleteUserService: DeleteUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteUser = await this.deleteUserService.execute({ id });

    res.status(200).json(deleteUser);
  }
}
