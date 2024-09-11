import { ICardBankRepository } from "../../../usecases/ports/ICard-bank-repository";
import { AppDataSource } from "../../postgres/data-source";
import { CardBankEntityDb } from "../../../infra/db/entities/card-bank/card-bank-entity-db";
import { CardBank } from "../../../domain/entities/card-bank";

export class TypeOrmCardBankRepository implements ICardBankRepository {
  async create({
    cvv,
    id_user,
    number_card,
    validaty,
  }: CardBank): Promise<CardBank> {
    const cardBank = await AppDataSource.getRepository(CardBankEntityDb).create(
      {
        cvv,
        id_user,
        number_card,
        validaty,
      }
    );

    await AppDataSource.getRepository(CardBankEntityDb).save(cardBank);

    return cardBank;
  }
}
