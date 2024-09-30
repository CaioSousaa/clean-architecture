import { User } from "../../../../domain/entities/user";

export async function checkingUserAlreadyPlan(user: User): Promise<boolean> {
  if (user.status_plan === true) {
    return true;
  }

  return false;
}
