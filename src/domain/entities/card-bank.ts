import { User } from "./user";

export class CardBank {
  id?: string;
  validaty: string;
  cvv: number;
  number_card: number;
  user: User;

  constructor({ validaty, cvv, number_card, user }: CardBank) {
    Object.assign(this, {
      validaty,
      cvv,
      user,
      number_card,
    });
  }

  static create({ validaty, cvv, user, number_card }: CardBank) {
    const cardBank = new CardBank({
      validaty,
      cvv,
      number_card,
      user,
    });

    return cardBank;
  }
}
