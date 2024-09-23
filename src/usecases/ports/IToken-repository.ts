import { Token } from "../../domain/entities/token";

export interface ITokenRepository {
  create(token: Token): Promise<Token>;
  findToken(token: string): Promise<Token>;
  updateStatus(token: string): Promise<Token>;
}
