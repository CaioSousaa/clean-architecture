import { CreateFixedsPlans } from "../../../../usecases/plans/usecases/create-plans/create-fixed-plans";
import { Request, Response } from "express";

export class FixedPlansController {
  constructor(private fixedPlansUseCase: CreateFixedsPlans) {}

  async handle(req: Request, res: Response) {
    const plans = await this.fixedPlansUseCase.execute();

    res.status(200).send(plans);
  }
}
