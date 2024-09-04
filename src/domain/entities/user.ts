export class User {
  id?: string;
  first_name: string;
  surname: string;
  age: number;
  unique_identifier: string;
  address: string;
  created_at: Date;

  constructor({
    first_name,
    surname,
    age,
    unique_identifier,
    address,
    created_at,
  }: User) {
    Object.assign(this, {
      first_name,
      surname,
      age,
      unique_identifier,
      address,
      created_at,
    });
  }

  static create({
    first_name,
    surname,
    age,
    unique_identifier,
    address,
  }: User) {
    const user = new User({
      first_name,
      surname,
      age,
      address,
      unique_identifier,
      created_at: new Date(),
    });

    return user;
  }
}
