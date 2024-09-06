import { AppError } from "../../adapters/errors/app-error";
import { IUserRepository } from "../ports/IUser-respository";
import { IFindByIdDTO } from "./dto/IFind-by-id-DTO";

export class FindUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute({ id }: IFindByIdDTO) {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      return new AppError("user not found", 401);
    }

    return user;
  }
}
