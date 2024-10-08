import { CardBank } from "../../../domain/entities/card-bank";
import { ICardBankRepository } from "../../ports/ICard-bank-repository";
import { v4 as uuid } from "uuid";

export class InMemoryCardBankRepository implements ICardBankRepository {
  async findCardByUserId(user_id: string): Promise<CardBank> {
    const card = this.cardBanks.find((e) => e.user.id === user_id);

    return card;
  }

  async findByCVV(cvv: number): Promise<CardBank> {
    const card = this.cardBanks.find((e) => e.cvv === cvv);

    return card;
  }

  async findByNumberCard(number_card: number): Promise<CardBank> {
    const card = this.cardBanks.find((e) => e.number_card === number_card);

    return card;
  }

  private cardBanks: CardBank[] = [];
  async create(cardBank: CardBank): Promise<CardBank> {
    Object.assign(cardBank, {
      id: uuid(),
    });

    this.cardBanks.push(cardBank);

    return cardBank;
  }
}
