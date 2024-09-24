import { CardBank } from "../../domain/entities/card-bank";

export interface ICardBankRepository {
  create(cardBank: CardBank): Promise<CardBank>;
  findByCVV(cvv: number): Promise<CardBank>;
  findByNumberCard(number_card: number): Promise<CardBank>;
}
