import { RegisterCardBankController } from "../../adapters/presentation/controllers/register-card-bank/register-card-bank-controller";
import { TypeOrmCardBankRepository } from "../../external/repositories/card-bank-repository/typeOrm-card-bank-repository";
import { TypeOrmUserRepository } from "../../external/repositories/user-repository/typeOrm-user-repository";
import { RegisterCardBank } from "../../usecases/usecases-user/register-card-bank/register-card-bank";

export const registerCardBankFactory = () => {
  const userRepository = new TypeOrmUserRepository();
  const cardBankRepository = new TypeOrmCardBankRepository();
  const registerCardBank = new RegisterCardBank(
    userRepository,
    cardBankRepository
  );
  const registerCardBankController = new RegisterCardBankController(
    registerCardBank
  );

  return registerCardBankController;
};
