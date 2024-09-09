export class CardBank {
  id?: string;
  validity: number;
  cvv: number;
  number_card: number;
  id_user: string;

  constructor({ validity, cvv, number_card, id_user }: CardBank) {
    Object.assign(this, {
      validity,
      cvv,
      id_user,
      number_card,
    });
  }

  static create({ validity, cvv, id_user, number_card }: CardBank) {
    const cardBank = new CardBank({
      validity,
      cvv,
      number_card,
      id_user,
    });

    return cardBank;
  }
}
