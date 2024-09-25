export class Plans {
  id: number;
  price_in_cent: number;
  description: string;

  constructor({ id, price_in_cent, description }: Plans) {
    Object.assign(this, {
      id,
      price_in_cent,
      description,
    });
  }

  static create({ id, price_in_cent, description }: Plans) {
    const plans: Plans = {
      id,
      price_in_cent,
      description,
    };

    return plans;
  }
}
