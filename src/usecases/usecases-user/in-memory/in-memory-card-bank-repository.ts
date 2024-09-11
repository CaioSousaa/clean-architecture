import { CardBank } from "../../../domain/entities/card-bank";
import { ICardBankRepository } from "../../ports/ICard-bank-repository";
import { v4 as uuid } from "uuid";

export class InMemoryCardBankRepository implements ICardBankRepository {
  private cardBanks: CardBank[];
  async create(cardBank: CardBank): Promise<CardBank> {
    Object.assign(cardBank, {
      id: uuid(),
    });

    this.cardBanks.push(cardBank);

    return cardBank;
  }
}
