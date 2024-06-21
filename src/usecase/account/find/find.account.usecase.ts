import AccountRepositoryInterface from '../../../domain/account/repository/account-repository.interface';
import { InputFindAccountDto, OutputFindAccountDto } from './find.account.dto';

export default class FindAccountUseCase {
  private accountRepository: AccountRepositoryInterface;

  constructor(accountRepository: AccountRepositoryInterface) {
    this.accountRepository = accountRepository;
  }

  async execute(id: string): Promise<OutputFindAccountDto> {
    const account = await this.accountRepository.find(id);

    if (!account || !account.accountModel) {
      throw new Error('Account not found');
    }
    return {
      id: account.accountModel._id,
      account_number: account.accountModel.account_number,
      user_id: account.accountModel.user_id,
      balance: Number(account.accountModel.balance),
      user: {
        id: account.userModel.id,
        name: account.userModel.name,
        tax_id: account.userModel.tax_id,
        password: account.userModel.password,
      },
    };
  }
}
