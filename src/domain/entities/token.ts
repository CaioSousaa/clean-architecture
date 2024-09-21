export class Token {
  id?: string;
  user_id: string;
  expires_in: number;
  token: string;
  used: boolean;
  created_at: Date;

  constructor({ user_id, expires_in, token, created_at, used }: Token) {
    Object.assign(this, {
      user_id,
      token,
      created_at,
      expires_in,
      used,
    });
  }

  static create({ token, used, expires_in, user_id }: Token) {
    const createdToken: Token = {
      token,
      used,
      expires_in,
      user_id,
      created_at: new Date(),
    };

    return createdToken;
  }
}
