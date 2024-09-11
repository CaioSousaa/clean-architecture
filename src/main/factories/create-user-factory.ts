import { TypeOrmUserRepository } from "../../external/repositories/user-repository/typeOrm-user-repository";
import { CreateUser } from "../../usecases/usecases-user/create-user/create-user";
import { CreateUserController } from "../../adapters/presentation/controllers/user-controller/create-user-controller";

export const createUserFactory = () => {
  const typeOrmUserRepository = new TypeOrmUserRepository();
  const createUser = new CreateUser(typeOrmUserRepository);
  const createUserController = new CreateUserController(createUser);

  return createUserController;
};
