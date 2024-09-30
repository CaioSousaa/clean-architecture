import { Plans } from "../../../../domain/entities/plans";

export async function purchase(
  plan: Plans,
  payment_in_cent: number
): Promise<boolean> {
  if (plan.price_in_cent > payment_in_cent) {
    return false;
  }

  return true;
}
