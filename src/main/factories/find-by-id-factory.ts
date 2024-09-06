import { TypeOrmUserRepository } from "../../external/repositories/user-repository/typeOrm-user-repository";
import { FindUserByIdUseCase } from "../../usecases/find-by-id/find-user-by-id";
import { FindUserByIdController } from "../../adapters/presentation/controllers/find-user-by-id-controller/find-user-by-id-controller";

export const findUserByIdFactory = () => {
  const typeOrmRepository = new TypeOrmUserRepository();
  const findUserById = new FindUserByIdUseCase(typeOrmRepository);
  const findUserByIdController = new FindUserByIdController(findUserById);

  return findUserByIdController;
};
