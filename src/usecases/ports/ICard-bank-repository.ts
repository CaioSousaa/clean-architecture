import { CardBank } from "../../domain/entities/card-bank";

export interface ICardBankRepository {
  create(cardBank: CardBank): Promise<CardBank>;
}
