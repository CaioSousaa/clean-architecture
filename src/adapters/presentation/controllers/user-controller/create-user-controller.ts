import { Request, Response } from "express";
import { CreateUser } from "../../../../usecases/usecases-user/create-user/create-user";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUser) {}
  async handle(req: Request, res: Response) {
    const {
      first_name,
      surname,
      age,
      address,
      unique_identifier,
      password,
      email,
      status_plan,
      cvv,
      number_card,
      validaty,
    } = req.body;

    const user = await this.createUserUseCase.execute({
      first_name,
      surname,
      address,
      age,
      unique_identifier,
      email,
      password,
      status_plan,
      cvv,
      number_card,
      validaty,
    });

    res.status(201).json(user);
  }
}
