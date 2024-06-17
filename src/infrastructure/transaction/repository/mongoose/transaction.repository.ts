import Transaction from '../../../../domain/transaction/entity/transaction';
import TransactionRepositoryInterface from '../../../../domain/transaction/repository/transaction-repository.interface';
import { TransactionModel } from './transaction.model';

export default class TransactionRepository
  implements TransactionRepositoryInterface
{
  async create(entity: Transaction): Promise<void> {
    await TransactionModel.create({
      id: entity.id,
      sender: entity.sender,
      receiver: entity.receiver,
      value: entity.value,
      date: new Date(),
    });
  }

  async update(entity: Transaction): Promise<void> {
    await TransactionModel.updateOne(
      {
        sender: entity.sender,
        receiver: entity.receiver,
        value: entity.value,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Transaction> {
    let transactionModel;
    console.log('id ===', id);
    try {
      transactionModel = await TransactionModel.findById(id);
    } catch (error) {
      throw new Error('Transaction not found');
    }

    return new Transaction(
      id,
      transactionModel.sender,
      transactionModel.receiver,
      Number(transactionModel.value)
    );
  }

  async findAll(): Promise<Transaction[]> {
    const transactionModels = await TransactionModel.find();

    const transactions = transactionModels.map((transactionModels) => {
      let transaction = new Transaction(
        transactionModels.id,
        transactionModels.sender,
        transactionModels.receiver,
        Number(transactionModels.value)
      );

      return transaction;
    });

    return transactions;
  }
}
