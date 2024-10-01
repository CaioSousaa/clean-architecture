import { Request, Response } from "express";
import { GetPlansUseCase } from "../../../../usecases/plans/usecases/get-plans/get-plans";

export class GetPlansController {
  constructor(private getPlansUseCase: GetPlansUseCase) {}

  async handle(req: Request, res: Response) {
    const plans = await this.getPlansUseCase.execute();

    res.status(200).send(plans);
  }
}
