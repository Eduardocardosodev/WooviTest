import AccountRepositoryInterface from '../../../domain/account/repository/account-repository.interface';
import {
  InputCreateAccountDto,
  OutputCreateAccountDto,
} from './create.account.dto';
import AccountFactory from '../../../domain/account/factory/account.factory';
import User from '../../../domain/user/entity/user';
import { hash } from 'bcryptjs';
import Account from '../../../domain/account/entity/account';

export default class CreateAccountUseCase {
  private accountRepository: AccountRepositoryInterface;

  constructor(accountRepository: AccountRepositoryInterface) {
    this.accountRepository = accountRepository;
  }

  async execute(input: InputCreateAccountDto): Promise<OutputCreateAccountDto> {
    const password_hash = await hash(input.user.password, 6);

    const user = new User(input.user.name, input.user.tax_id, password_hash);

    const account = new Account(input.balance, user);

    console.log('ACCOUNT EXECUTE ===', account);

    await this.accountRepository.create(account);

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
