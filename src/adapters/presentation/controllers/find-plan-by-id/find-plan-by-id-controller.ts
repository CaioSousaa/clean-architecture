import { Request, Response } from "express";
import { FindPlanByIdUseCase } from "../../../../usecases/plans/usecases/find-plan-by-id/find-plan-by-id";

export class FindPlanByIdController {
  constructor(private findPlanUseCase: FindPlanByIdUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const planId = Number(id);

    const plan = await this.findPlanUseCase.execute({ id: planId });

    res.status(200).send(plan);
  }
}
