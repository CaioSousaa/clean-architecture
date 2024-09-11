import { CardBank } from "./card-bank";

export class User {
  id?: string;
  first_name: string;
  surname: string;
  age: number;
  unique_identifier: string;
  address: string;
  status_plan: boolean;
  email: string;
  password: string;
  card_bank: CardBank;
  created_at: Date;

  constructor({
    first_name,
    surname,
    age,
    unique_identifier,
    address,
    created_at,
    email,
    password,
    status_plan,
    card_bank,
  }: User) {
    Object.assign(this, {
      first_name,
      surname,
      age,
      unique_identifier,
      address,
      created_at,
      email,
      password,
      status_plan,
      card_bank,
    });
  }

  static create({
    first_name,
    surname,
    age,
    unique_identifier,
    address,
    email,
    password,
    status_plan,
    card_bank,
  }: User) {
    const user = new User({
      first_name,
      surname,
      age,
      address,
      unique_identifier,
      email,
      password,
      status_plan,
      card_bank,
      created_at: new Date(),
    });

    return user;
  }
}
