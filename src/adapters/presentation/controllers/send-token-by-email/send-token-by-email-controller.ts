import { Request, Response } from "express";
import { SendTokenByEmail } from "../../../../usecases/usecases-user/update-user/send-token-by-email";

export class SendTokenByEmailController {
  constructor(private sendToken: SendTokenByEmail) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const sendTokenByEmail = await this.sendToken.execute(id);

    res.status(201).send(sendTokenByEmail);
  }
}
