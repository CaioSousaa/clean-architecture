import { FixedPlansController } from "../../adapters/presentation/controllers/fixed-plans/fixed-plans-controller";
import { TypeOrmPlansRepository } from "../../external/repositories/plans-repository/typeOrm-plans-repository";
import { CreateFixedsPlans } from "../../usecases/plans/create-fixed-plans";

export const fixedPlans = () => {
  const plansRepository = new TypeOrmPlansRepository();
  const createFixedPlans = new CreateFixedsPlans(plansRepository);
  const fixedPlansController = new FixedPlansController(createFixedPlans);

  return fixedPlansController;
};
