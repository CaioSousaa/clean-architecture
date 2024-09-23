import { ICardBankRepository } from "../../../usecases/ports/ICard-bank-repository";
import { AppDataSource } from "../../postgres/data-source";
import { CardBankEntityDb } from "../../../infra/db/entities/card-bank/card-bank-entity-db";
import { CardBank } from "../../../domain/entities/card-bank";

export class TypeOrmCardBankRepository implements ICardBankRepository {
  async create({
    cvv,
    user,
    number_card,
    validaty,
  }: CardBank): Promise<CardBank> {
    const cardBank = AppDataSource.getRepository(CardBankEntityDb).create({
      cvv,
      number_card,
      validaty,
      user,
    });

    await AppDataSource.getRepository(CardBankEntityDb).save(cardBank);

    return cardBank;
  }
}
