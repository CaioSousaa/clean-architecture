import { AppError } from "../../../adapters/errors/app-error";
import { IRegisterPlansRepository } from "../../ports/IRegister-plan";
import { IUserRepository } from "../../ports/IUser-respository";
import { IRemovePlanDTO } from "./dto/IRemove-plan-dto";

export class RemovePlanUseCase {
  constructor(
    private userRepository: IUserRepository,
    private registerPlanRepository: IRegisterPlansRepository
  ) {}

  async execute({ user_id }: IRemovePlanDTO) {
    try {
      const user = await this.userRepository.findUserById(user_id);

      if (!user) {
        throw new AppError("user not found", 404);
      }

      if (user.status_plan === false) {
        throw new AppError(
          "user does not have an active plan, it is impossible to continue",
          400
        );
      }

      await this.userRepository.removeStatus(user_id);
      await this.registerPlanRepository.removePlan(user_id);

      return;
    } catch (err) {
      return err;
    }
  }
}
