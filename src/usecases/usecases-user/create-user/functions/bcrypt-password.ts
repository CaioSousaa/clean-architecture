import * as bcrypt from "bcrypt";

export async function bcryptPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);

  const passwordBcrypt = await bcrypt.hash(password, salt);

  return passwordBcrypt;
}
