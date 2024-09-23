import { Token } from "../../../domain/entities/token";
import { ITokenRepository } from "../../ports/IToken-repository";
import { v4 as uuid } from "uuid";

export class InMemoryTokenRepository implements ITokenRepository {
  private tokens: Token[] = [];
  async create(token: Token): Promise<Token> {
    Object.assign(token, {
      id: uuid(),
    });

    this.tokens.push(token);

    return token;
  }

  async findToken(token: string): Promise<Token> {
    const findToken = this.tokens.find((t) => t.token === token);

    return findToken;
  }

  async updateStatus(token: string): Promise<Token> {
    const existingToken = this.tokens.find((t) => t.token === token);

    if (existingToken) {
      existingToken.used = true;
    }

    return existingToken;
  }
}
