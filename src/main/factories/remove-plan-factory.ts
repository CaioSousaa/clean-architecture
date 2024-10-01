import { RemovePlanController } from "../../adapters/presentation/controllers/remove-plan/remove-plan-controller";
import { TypeOrmRegisterPlanRepository } from "../../external/repositories/register-plan/typeOrm-register-plan-repository";
import { TypeOrmUserRepository } from "../../external/repositories/user-repository/typeOrm-user-repository";
import { RemovePlanUseCase } from "../../usecases/usercases-register-plan/remove-plan/remove-plan";

export const removePlanFactory = () => {
  const userRepository = new TypeOrmUserRepository();
  const registerPlanRepository = new TypeOrmRegisterPlanRepository();
  const removePlanUseCase = new RemovePlanUseCase(
    userRepository,
    registerPlanRepository
  );
  const removePlanController = new RemovePlanController(removePlanUseCase);

  return removePlanController;
};
