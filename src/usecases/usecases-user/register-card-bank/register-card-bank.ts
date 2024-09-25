import { AppError } from "../../../adapters/errors/app-error";
import { CardBank } from "../../../domain/entities/card-bank";
import { ICardBankRepository } from "../../ports/ICard-bank-repository";
import { IUserRepository } from "../../ports/IUser-respository";
import { IRegisterCardBankDTO } from "./dto/IRegister-card-bank-dto";

export class RegisterCardBank {
  constructor(
    private userRepository: IUserRepository,
    private cardBankRepository: ICardBankRepository
  ) {}

  async execute({ cvv, number_card, user_id, validaty }: IRegisterCardBankDTO) {
    try {
      const user = await this.userRepository.findUserById(user_id);

      if (!user) {
        throw new AppError("user not found", 400);
      }

      const cvvInUse = await this.cardBankRepository.findByCVV(cvv);
      const numberCardInUse = await this.cardBankRepository.findByNumberCard(
        number_card
      );

      if (cvvInUse || numberCardInUse) {
        throw new AppError("card is already being used by another user", 404);
      }

      const cardBank: CardBank = CardBank.create({
        user,
        cvv,
        validaty,
        number_card,
      });

      const registerCardBank = await this.cardBankRepository.create(cardBank);

      await this.userRepository.addCardBank(user_id, registerCardBank);

      return registerCardBank;
    } catch (err) {
      return err;
    }
  }
}
