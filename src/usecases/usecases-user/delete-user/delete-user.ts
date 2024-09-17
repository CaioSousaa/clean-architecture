import { AppError } from "../../../adapters/errors/app-error";
import { IUserRepository } from "../../ports/IUser-respository";
import { IDeleteUserDTO } from "./dto/IDelete-user-dto";

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ id }: IDeleteUserDTO) {
    try {
      const userExists = await this.userRepository.findUserById(id);

      if (!userExists) {
        throw new AppError("the user does not exist", 404);
      }

      const deleteUser = await this.userRepository.deleteUser(id);

      return deleteUser;
    } catch (err) {
      return err;
    }
  }
}
