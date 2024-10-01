import { FindPlanByIdController } from "../../adapters/presentation/controllers/find-plan-by-id/find-plan-by-id-controller";
import { TypeOrmPlansRepository } from "../../external/repositories/plans-repository/typeOrm-plans-repository";
import { FindPlanByIdUseCase } from "../../usecases/plans/usecases/find-plan-by-id/find-plan-by-id";

export const findPlanByIdFactory = () => {
  const plansRepository = new TypeOrmPlansRepository();
  const findPlanByIdUseCase = new FindPlanByIdUseCase(plansRepository);
  const findPlanByIdController = new FindPlanByIdController(
    findPlanByIdUseCase
  );

  return findPlanByIdController;
};
