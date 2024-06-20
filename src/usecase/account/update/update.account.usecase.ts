import AccountRepositoryInterface from '../../../domain/account/repository/account-repository.interface';
import {
  InputAddBalanceAccountDto,
  InputUpdateAccountDto,
  OutputAddBalanceAccountDto,
  OutputUpdateAccountDto,
} from './update.account.dto';

export default class UpdateAccountUseCase {
  private accountRepository: AccountRepositoryInterface;
  constructor(accountRepository: AccountRepositoryInterface) {
    this.accountRepository = accountRepository;
  }

  async execute(input: InputUpdateAccountDto): Promise<OutputUpdateAccountDto> {
    const account = await this.accountRepository.find(input.id);

    await this.accountRepository.update(account);

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

  async addBalance(
    input: InputAddBalanceAccountDto
  ): Promise<OutputAddBalanceAccountDto> {
    const account = await this.accountRepository.find(input.id);

    if (!account) throw new Error('Account not found');

    const balanceUpdate = account.balance + input.balance;

    await this.accountRepository.update({
      id: input.id,
      balance: balanceUpdate,
    });

    return {
      id: account.id,
      account_number: account.account_number,
      user_id: account.user_id,
      balance: account.balance,
    };
  }
}
