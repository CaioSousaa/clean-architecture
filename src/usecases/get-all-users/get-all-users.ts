import { IUserRepository } from "../ports/IUser-respository";

export class GetAllUsers {
  constructor(private userRepository: IUserRepository) {}

  async execute() {
    const users = await this.userRepository.getAllUsers();

    return { users };
  }
}
