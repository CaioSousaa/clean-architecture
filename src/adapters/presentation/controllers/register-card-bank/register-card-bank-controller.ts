import { RegisterCardBank } from "../../../../usecases/usecases-user/register-card-bank/register-card-bank";
import { Request, Response } from "express";

export class RegisterCardBankController {
  constructor(private registerCardBank: RegisterCardBank) {}

  async handle(req: Request, res: Response) {
    const { user_id } = req.params;
    const { validaty, number_card, cvv } = req.body;

    const cardBank = await this.registerCardBank.execute({
      user_id,
      validaty,
      number_card,
      cvv,
    });

    res.status(200).send(cardBank);
  }
}
