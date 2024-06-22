import AccountRepositoryInterface from '../../../domain/account/repository/account-repository.interface';
import { InputDeleteAccountDto } from './delete.account.dto';

export default class DeleteAccountUseCase {
  private accountRepository: AccountRepositoryInterface;

  constructor(accountRepository: AccountRepositoryInterface) {
    this.accountRepository = accountRepository;
  }

  async execute(input: InputDeleteAccountDto): Promise<any> {
    if (!input.id) {
      throw new Error('Id is required');
    }
    const accountDelete = await this.accountRepository.delete(input.id);

    return { message: 'Account successfully deleted' };
  }
}
