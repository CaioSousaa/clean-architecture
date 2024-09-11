import { Request, Response } from "express";
import { GetAllUsers } from "../../../../usecases/usecases-user/get-all-users/get-all-users";

export class GetaAllUsersController {
  constructor(private getAllUsers: GetAllUsers) {}
  async handle(req: Request, res: Response) {
    const users = await this.getAllUsers.execute();

    res.status(200).json(users);
  }
}
