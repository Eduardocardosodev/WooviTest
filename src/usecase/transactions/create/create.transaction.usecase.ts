import AccountRepositoryInterface from '../../../domain/account/repository/account-repository.interface';
import TransactionFactory from '../../../domain/transaction/factory/transaction.factory';
import TransactionRepositoryInterface from '../../../domain/transaction/repository/transaction-repository.interface';
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
    const transaction = TransactionFactory.create(
      input.sender,
      input.receiver,
      input.value
    );

    const accountSender = await this.accountRepository.find(input.sender);
    const accountReceiver = await this.accountRepository.find(input.receiver);

    if (!accountSender) throw new Error('Sender account not found');

    if (!accountReceiver) throw new Error('Receiver account not found');

    if (accountSender.balance < input.value) {
      throw new Error('Balance is below the value');
    }

    const updateBalanceSender = accountSender.balance - Number(input.value);

    await this.accountRepository.update({
      id: input.sender,
      balance: updateBalanceSender,
    });

    const updateBalanceReceiver = accountReceiver.balance + Number(input.value);

    await this.accountRepository.update({
      id: input.receiver,
      balance: updateBalanceReceiver,
    });

    await this.transactionRepository.create(transaction);

    return {
      id: transaction.id,
      sender: transaction.sender,
      receiver: transaction.receiver,
      value: transaction.value,
    };
  }
}
