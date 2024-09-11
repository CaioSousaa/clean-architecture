import { GetaAllUsersController } from "../../adapters/presentation/controllers/get-all-users-controller/get-all-users-controller";
import { TypeOrmUserRepository } from "../../external/repositories/user-repository/typeOrm-user-repository";
import { GetAllUsers } from "../../usecases/usecases-user/get-all-users/get-all-users";

export const getAllUsersFactory = () => {
  const typeOrmUserRepository = new TypeOrmUserRepository();
  const getAllUsers = new GetAllUsers(typeOrmUserRepository);
  const getAllUsersController = new GetaAllUsersController(getAllUsers);

  return getAllUsersController;
};
