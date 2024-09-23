import { UpdateUserController } from "../../adapters/presentation/controllers/update-user/update-user-controller";
import { TypeOrmCreateTokenRepository } from "../../external/repositories/token/typeOrm-create-token";
import { TypeOrmUserRepository } from "../../external/repositories/user-repository/typeOrm-user-repository";
import { UpdateUser } from "../../usecases/usecases-user/update-user/update-user";

export const updateUserFactory = () => {
  const userRepository = new TypeOrmUserRepository();
  const tokenRepository = new TypeOrmCreateTokenRepository();
  const updateUserUseCase = new UpdateUser(userRepository, tokenRepository);
  const updateUserController = new UpdateUserController(updateUserUseCase);

  return updateUserController;
};
