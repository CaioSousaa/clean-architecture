import { AppError } from "../../../adapters/errors/app-error";
import { RegisterPlan } from "../../../domain/entities/register-plan";
import { ICardBankRepository } from "../../ports/ICard-bank-repository";
import { IPlansRepository } from "../../ports/IPlans-repository";
import { IRegisterPlansRepository } from "../../ports/IRegister-plan";
import { IUserRepository } from "../../ports/IUser-respository";
import { IRegisterPlanDTO } from "./dto/IRegister-plan-dto";
import { checkingUserAlreadyPlan } from "./functions/checking-user-already-plan";
import { purchase } from "./functions/purchase";

export class CreateRegisterPlan {
  constructor(
    private userRepository: IUserRepository,
    private planRepository: IRegisterPlansRepository,
    private cardBankRepository: ICardBankRepository,
    private plansFixedRepository: IPlansRepository
  ) {}

  async execute(
    { user_id, plan_id }: IRegisterPlanDTO,
    payment_in_cent: number
  ) {
    try {
      const user = await this.userRepository.findUserById(user_id);

      if (!user) {
        throw new AppError("user does not exist", 400);
      }

      const checkingUserAlreadyHasPlan = await checkingUserAlreadyPlan(user);

      if (checkingUserAlreadyHasPlan) {
        throw new AppError(
          "impossible to continue, the user already has an active plan",
          401
        );
      }

      const userHasCardBank = await this.cardBankRepository.findCardByUserId(
        user_id
      );

      if (!userHasCardBank) {
        throw new AppError(
          "to make the purchase, a payment method is required.",
          401
        );
      }

      const plan = await this.plansFixedRepository.findById(plan_id);

      const validForPurchase = await purchase(plan, payment_in_cent);

      if (!validForPurchase) {
        throw new AppError(
          "value not compatible with the price of the plan",
          401
        );
      }

      const registerPlan: RegisterPlan = RegisterPlan.create({
        user_id: user.id,
        plan_id,
      });

      const register = await this.planRepository.create(registerPlan);

      await this.userRepository.updateStatus(user.id);

      return register;
    } catch (err) {
      return err;
    }
  }
}
