import AccountRepositoryInterface from '../../../domain/account/repository/account-repository.interface';
import TransactionRepositoryInterface from '../../../domain/transaction/repository/transaction-repository.interface';
import { InputDeleteTransactionDto } from './delete.transaction.dto';

export default class DeletetransactionUseCase {
  private transactionRepository: TransactionRepositoryInterface;
  private accountRepository: AccountRepositoryInterface;

  constructor(
    transactionRepository: TransactionRepositoryInterface,
    accountRepository: AccountRepositoryInterface
  ) {
    this.transactionRepository = transactionRepository;
    this.accountRepository = accountRepository;
  }

  async execute(input: InputDeleteTransactionDto): Promise<any> {
    if (!input.id) {
      throw new Error('Id is required');
    }

    const transaction = await this.transactionRepository.delete(input.id);
    const accountSender = await this.accountRepository.find(transaction.sender);
    const accountReceiver = await this.accountRepository.find(
      transaction.receiver
    );

    const returnBalanceToAccountSender =
      accountSender.accountModel.balance + Number(transaction.value);

    const returnBalanceToAccountReceiver =
      accountReceiver.accountModel.balance - Number(transaction.value);

    await this.accountRepository.update({
      id: accountSender.accountModel.id,
      balance: returnBalanceToAccountSender,
    });

    await this.accountRepository.update({
      id: accountReceiver.accountModel.id,
      balance: returnBalanceToAccountReceiver,
    });

    return { message: 'Transaction successfully deleted' };
  }
}
