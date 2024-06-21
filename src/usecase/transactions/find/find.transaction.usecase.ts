import TransactionRepositoryInterface from '../../../domain/transaction/repository/transaction-repository.interface';
import {
  InputFindTransactionDto,
  OutputFindTransactionDto,
} from './find.transaction.dto';

export default class FindTransactionUseCase {
  private transactionRepository: TransactionRepositoryInterface;

  constructor(transactionRepository: TransactionRepositoryInterface) {
    this.transactionRepository = transactionRepository;
  }

  async execute(
    input: InputFindTransactionDto
  ): Promise<OutputFindTransactionDto> {
    const transaction = await this.transactionRepository.find(input.id);

    if (!transaction) throw new Error('Transaction not found');

    return {
      id: transaction.id,
      sender: transaction.sender,
      receiver: transaction.receiver,
      value: Number(transaction.value),
    };
  }
}
