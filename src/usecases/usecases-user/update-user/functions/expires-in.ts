export function expiresIn() {
  const currentDate = Math.floor(Date.now() / 1000);

  const expireIn = currentDate + 60 * 60 * 24;

  return expireIn;
}
