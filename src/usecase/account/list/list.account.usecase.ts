import Account from '../../../domain/account/entity/account';
import AccountRepositoryInterface from '../../../domain/account/repository/account-repository.interface';
import { InputListAccountDto, OutputListAccountDto } from './list.account.dto';

export default class ListAccountUseCase {
  private accountRepository: AccountRepositoryInterface;

  constructor(accountRepository: AccountRepositoryInterface) {
    this.accountRepository = accountRepository;
  }

  async execute(): Promise<OutputListAccountDto[]> {
    const accounts = await this.accountRepository.findAll();
    return accounts;
  }
}

class OutputMapper {
  static toOutput(accounts: Account[]): OutputListAccountDto {
    return {
      accounts: accounts.map((account) => ({
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
      })),
    };
  }
}
