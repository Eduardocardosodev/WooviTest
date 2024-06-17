import AccountFactory from '../../../domain/account/factory/account.factory';
import AccountRepositoryInterface from '../../../domain/account/repository/account-repository.interface';
import TransactionFactory from '../../../domain/transaction/factory/transaction.factory';
import TransactionRepositoryInterface from '../../../domain/transaction/repository/transaction-repository.interface';
import UserRepositoryInterface from '../../../domain/user/repository/user-repository.interface';
import {
  InputCreateTransactionDto,
  OutputCreateTransactionDto,
} from './create.transaction.dto';

export default class CreateTransactionUseCase {
  private transactionRepository: TransactionRepositoryInterface;
  private accountRepository: AccountRepositoryInterface;

  constructor(
    transactionRepository: TransactionRepositoryInterface,
    accountRepository: AccountRepositoryInterface
  ) {
    this.transactionRepository = transactionRepository;
    this.accountRepository = accountRepository;
  }

  async execute(
    input: InputCreateTransactionDto
  ): Promise<OutputCreateTransactionDto> {
    const accountSender = await this.accountRepository.find(input.sender);
    const accountReceiver = await this.accountRepository.find(input.receiver);

    console.log('ACCOUNT SENDER ===', accountSender);

    if (accountSender.balance < input.value) {
      throw new Error('Balance is below the value');
    }

    const updateBalanceSender = accountSender.balance - Number(input.value);

    const updateAccountSenderParams = {
      id: accountSender.id,
      balance: updateBalanceSender,
    };

    const updateAccountSender = await this.accountRepository.update(
      updateAccountSenderParams
    );

    const updateBalanceReceiver = accountReceiver.balance + Number(input.value);
    const updateAccountReceiverParams = {
      id: accountReceiver.id,
      balance: updateBalanceReceiver,
    };

    const updateAccountReceiver = await this.accountRepository.update(
      updateAccountReceiverParams
    );

    console.log('UPDATE BALKANCE SENDER=====', updateAccountSender);

    console.log('UPDATE BALKANCE BALANCE =====', updateAccountReceiver);

    const transaction = TransactionFactory.create(
      input.sender,
      input.receiver,
      input.value
    );

    await this.transactionRepository.create(transaction);

    return {
      id: transaction.id,
      sender: transaction.sender,
      receiver: transaction.receiver,
      value: transaction.value,
    };
  }
}
