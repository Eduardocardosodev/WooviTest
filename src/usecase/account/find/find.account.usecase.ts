import AccountRepositoryInterface from '../../../domain/account/repository/account-repository.interface';
import { InputFindAccountDto, OutputFindAccountDto } from './find.account.dto';

export default class FindAccountUseCase {
  private accountRepository: AccountRepositoryInterface;

  constructor(accountRepository: AccountRepositoryInterface) {
    this.accountRepository = accountRepository;
  }

  async execute(input: InputFindAccountDto): Promise<OutputFindAccountDto> {
    const account = await this.accountRepository.find(input.id);

    if (!account) throw new Error('Account not found');

    return {
      id: account.id,
      account_number: account.account_number,
      user_id: account.user_id,
      balance: account.balance,
      user: {
        id: account.user.id,
        name: account.user.name,
        tax_id: account.user.tax_id,
        password: account.user.password,
      },
    };
  }
}
