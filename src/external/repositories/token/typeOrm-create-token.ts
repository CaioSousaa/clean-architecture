import { Token } from "../../../domain/entities/token";
import { TokenEntityDb } from "../../../infra/db/entities/token/token-entity-db";
import { ITokenRepository } from "../../../usecases/ports/IToken-repository";
import { AppDataSource } from "../../postgres/data-source";

export class TypeOrmCreateTokenRepository implements ITokenRepository {
  async create({ expires_in, used, user_id, token }: Token): Promise<Token> {
    const createToken = AppDataSource.getRepository(TokenEntityDb).create({
      expires_in,
      used,
      user_id,
      token,
      created_at: new Date(),
    });

    await AppDataSource.getRepository(TokenEntityDb).save(createToken);
    return createToken;
  }
}
