export class RegisterPlan {
  id?: string;
  user_id: string;
  plan_id: number;

  constructor({ user_id, plan_id }: RegisterPlan) {
    Object.assign(this, {
      user_id,
      plan_id,
    });
  }

  static create({ user_id, plan_id }: RegisterPlan) {
    const registerPlan: RegisterPlan = {
      user_id,
      plan_id,
    };

    return registerPlan;
  }
}
