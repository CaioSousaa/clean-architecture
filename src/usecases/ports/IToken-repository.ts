import { Token } from "../../domain/entities/token";

export interface ITokenRepository {
  create(token: Token): Promise<Token>;
}
