import { Request, Response } from "express";
import { RemovePlanUseCase } from "../../../../usecases/usercases-register-plan/remove-plan/remove-plan";

export class RemovePlanController {
  constructor(private removePlanUseCase: RemovePlanUseCase) {}

  async handle(req: Request, res: Response) {
    const { user_id } = req.params;

    const removePlan = await this.removePlanUseCase.execute({ user_id });

    res.status(200).send(removePlan);
  }
}
