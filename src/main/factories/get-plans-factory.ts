import { GetPlansController } from "../../adapters/presentation/controllers/get-plans/get-plans-controller";
import { TypeOrmPlansRepository } from "../../external/repositories/plans-repository/typeOrm-plans-repository";
import { GetPlansUseCase } from "../../usecases/plans/usecases/get-plans/get-plans";

export const getPlansFactory = () => {
  const plansRepository = new TypeOrmPlansRepository();
  const getPlansUseCase = new GetPlansUseCase(plansRepository);
  const getPlansController = new GetPlansController(getPlansUseCase);

  return getPlansController;
};
