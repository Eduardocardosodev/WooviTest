import Transaction from '../../../../domain/transaction/entity/transaction';
import TransactionRepositoryInterface from '../../../../domain/transaction/repository/transaction-repository.interface';
import { TransactionModel } from './transaction.model';
import { OutputFindAllTransactionDto } from './transaction.repository.dto';

export default class TransactionRepository
  implements TransactionRepositoryInterface
{
  async delete(id: string): Promise<any> {
    const transactionDeleted = await TransactionModel.findByIdAndDelete(id);
    if (!transactionDeleted) {
      throw new Error('Transaction not found');
    }

    return transactionDeleted;
  }
  async create(entity: Transaction): Promise<void> {
    await TransactionModel.create({
      _id: entity.id,
      sender: entity.sender,
      receiver: entity.receiver,
      value: entity.value,
      date: new Date(),
    });
  }

  async update(entity: Transaction): Promise<void> {}

  async find(id: string): Promise<any> {
    const transaction = await TransactionModel.findById(id);

    if (!transaction) throw new Error('Transaction not found');

    return transaction;
  }

  async findAll(): Promise<{ transactions: OutputFindAllTransactionDto }[]> {
    const transactionsModel = await TransactionModel.find();
    let transactionFormated: { transactions: OutputFindAllTransactionDto }[] =
      [];

    transactionsModel.map((transactionModel) => {
      const result: { transactions: OutputFindAllTransactionDto } = {
        transactions: {
          id: transactionModel._id,
          sender: transactionModel.sender,
          receiver: transactionModel.receiver,
          value: Number(transactionModel.value),
        },
      };
      transactionFormated.push(result);
    });

    return transactionFormated;
  }
}
