import { RegisterPlanController } from "../../adapters/presentation/controllers/register-plan/register-plan-controller";
import { TypeOrmCardBankRepository } from "../../external/repositories/card-bank-repository/typeOrm-card-bank-repository";
import { TypeOrmPlansRepository } from "../../external/repositories/plans-repository/typeOrm-plans-repository";
import { TypeOrmRegisterPlanRepository } from "../../external/repositories/register-plan/typeOrm-register-plan-repository";
import { TypeOrmUserRepository } from "../../external/repositories/user-repository/typeOrm-user-repository";
import { CreateRegisterPlan } from "../../usecases/usercases-register-plan/create-register-plan/create-register-plan";

export const createRegisterPlanFactory = () => {
  const userRepository = new TypeOrmUserRepository();
  const fixedPlansRepository = new TypeOrmPlansRepository();
  const cardBankRepository = new TypeOrmCardBankRepository();
  const planRepository = new TypeOrmRegisterPlanRepository();

  const createRegisterPlan = new CreateRegisterPlan(
    userRepository,
    planRepository,
    cardBankRepository,
    fixedPlansRepository
  );

  const registerPlanController = new RegisterPlanController(createRegisterPlan);

  return registerPlanController;
};
