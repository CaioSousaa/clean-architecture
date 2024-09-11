export class CardBank {
  id?: string;
  validaty: string;
  cvv: number;
  number_card: number;
  id_user: string;

  constructor({ validaty, cvv, number_card, id_user }: CardBank) {
    Object.assign(this, {
      validaty,
      cvv,
      id_user,
      number_card,
    });
  }

  static create({ validaty, cvv, id_user, number_card }: CardBank) {
    const cardBank = new CardBank({
      validaty,
      cvv,
      number_card,
      id_user,
    });

    return cardBank;
  }
}
