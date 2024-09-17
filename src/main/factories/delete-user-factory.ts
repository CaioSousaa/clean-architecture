import { DeleteUserController } from "../../adapters/presentation/controllers/delete-user/delete-user-controller";
import { TypeOrmUserRepository } from "../../external/repositories/user-repository/typeOrm-user-repository";
import { DeleteUserUseCase } from "../../usecases/usecases-user/delete-user/delete-user";

export const deleteUserFactory = () => {
  const typeOrmRepository = new TypeOrmUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(typeOrmRepository);
  const deleteUserController = new DeleteUserController(deleteUserUseCase);

  return deleteUserController;
};
