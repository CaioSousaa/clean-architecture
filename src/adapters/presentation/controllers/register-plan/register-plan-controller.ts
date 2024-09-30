import { Request, Response } from "express";
import { CreateRegisterPlan } from "../../../../usecases/usercases-register-plan/create-register-plan/create-register-plan";

export class RegisterPlanController {
  constructor(private createRegister: CreateRegisterPlan) {}
  async handle(req: Request, res: Response) {
    const { user_id } = req.params;
    const { payment_in_cent, plan_id } = req.body;

    const register = await this.createRegister.execute(
      {
        user_id,
        plan_id,
      },
      payment_in_cent
    );

    res.status(201).send(register);
  }
}
