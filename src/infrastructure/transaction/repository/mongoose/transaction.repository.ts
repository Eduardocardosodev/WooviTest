import Transaction from '../../../../domain/transaction/entity/transaction';
import TransactionRepositoryInterface from '../../../../domain/transaction/repository/transaction-repository.interface';
import { TransactionModel } from './transaction.model';

export default class TransactionRepository
  implements TransactionRepositoryInterface
{
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

  async find(id: string): Promise<Transaction> {
    const transaction = await TransactionModel.findById(id);

    if (!transaction) throw new Error('Transaction not found');

    return new Transaction(
      transaction.sender,
      transaction.receiver,
      Number(transaction.value)
    );
  }

  async findAll(): Promise<Transaction[]> {
    let transactionCompleted: Transaction[] = [];

    const transactionModels = await TransactionModel.find();

    const transactions = transactionModels.map((transactionModels) => {
      let transaction = new Transaction(
        transactionModels.sender,
        transactionModels.receiver,
        Number(transactionModels.value)
      );

      transactionCompleted.push(transaction);
    });

    return transactionCompleted;
  }
}
