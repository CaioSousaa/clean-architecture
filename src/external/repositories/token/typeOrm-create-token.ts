import { Token } from "../../../domain/entities/token";
import { TokenEntityDb } from "../../../infra/db/entities/token/token-entity-db";
import { ITokenRepository } from "../../../usecases/ports/IToken-repository";
import { AppDataSource } from "../../postgres/data-source";

export class TypeOrmCreateTokenRepository implements ITokenRepository {
  async updateStatus(token: string): Promise<Token> {
    const tokenVerify = await AppDataSource.getRepository(
      TokenEntityDb
    ).findOneBy({
      token,
    });

    const updateStatusUsedToken = AppDataSource.getRepository(
      TokenEntityDb
    ).merge(tokenVerify, {
      used: true,
    });

    const tokenUpdated = await AppDataSource.getRepository(TokenEntityDb).save(
      updateStatusUsedToken
    );

    return tokenUpdated;
  }

  async findToken(token: string): Promise<Token> {
    const tokenExist = await AppDataSource.getRepository(
      TokenEntityDb
    ).findOneBy({
      token,
    });

    return tokenExist;
  }

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
