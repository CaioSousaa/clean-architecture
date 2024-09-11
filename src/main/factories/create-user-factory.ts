import { TypeOrmUserRepository } from "../../external/repositories/user-repository/typeOrm-user-repository";
import { CreateUser } from "../../usecases/create-user/create-user";
import { CreateUserController } from "../../adapters/presentation/controllers/user-controller/create-user-controller";
import { TypeOrmCardBankRepository } from "../../external/repositories/card-bank-repository/typeOrm-card-bank-repository";

export const createUserFactory = () => {
  const typeOrmUserRepository = new TypeOrmUserRepository();
  const typeOrmCardBankRepository = new TypeOrmCardBankRepository();
  const createUser = new CreateUser(
    typeOrmUserRepository,
    typeOrmCardBankRepository
  );
  const createUserController = new CreateUserController(createUser);

  return createUserController;
};
