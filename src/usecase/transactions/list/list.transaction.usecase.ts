import Transaction from '../../../domain/transaction/entity/transaction';
import TransactionRepositoryInterface from '../../../domain/transaction/repository/transaction-repository.interface';
import {
  InputListTransactionDto,
  OutputListTransactionDto,
} from './list.transaction.dto';

export default class ListTransactionUseCase {
  private transactionRepository: TransactionRepositoryInterface;

  constructor(transactionRepository: TransactionRepositoryInterface) {
    this.transactionRepository = transactionRepository;
  }

  async execute(): Promise<OutputListTransactionDto[]> {
    const transactions = await this.transactionRepository.findAll();
    if (transactions.length === 0) throw new Error('Transaction not found');
    return transactions;
  }
}

// class OutputMapper {
//   static toOutput(transaction: Transaction[]): OutputListTransactionDto {
//     return {
//       transactions: transaction.map((transaction) => ({
//         id: transaction.id,
//         sender: transaction.sender,
//         receiver: transaction.receiver,
//         value: transaction.value,
//       })),
//     };
//   }
// }
