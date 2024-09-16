import { container } from "tsyringe";
import { TypeOrmUserRepository } from "../../external/repositories/user-repository/typeOrm-user-repository";

export const registerRepository = () =>
  container.register("UserRepository", {
    useClass: TypeOrmUserRepository,
  });
