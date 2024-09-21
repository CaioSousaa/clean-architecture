import { injectable } from "tsyringe";
import { sign } from "jsonwebtoken";

@injectable()
export class GenerateToken {
  async execute(id: string) {
    const token = sign({}, "ac81d22ce6aa0f7cf1b1e38f74c02957", {
      subject: id,
      expiresIn: "1d",
    });

    return token;
  }
}
