import mongoose, { Mongoose } from 'mongoose';
import TransactionRepository from './transaction.repository';
import Transaction from '../../../../domain/transaction/entity/transaction';
import { TransactionModel } from './transaction.model';
import dotenv from 'dotenv';

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
describe('transaction repository test', () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ingyz5d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
      );
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  });

  afterEach(async () => {
    await TransactionModel.deleteMany({});
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });

  it('should create a transaction', async () => {
    const transactionRepository = new TransactionRepository();
    const transaction = new Transaction('123', 'sender_id', 'receiver_id', 100);
    await transactionRepository.create(transaction);

    const transactionModel = await TransactionModel.findById('123');

    expect(transactionModel).toBeDefined();
    expect(transactionModel!.sender).toBe(transaction.sender);
    expect(transactionModel!.receiver).toBe(transaction.receiver);
    expect(transactionModel!.value.toString()).toBe(
      transaction.value.toString()
    );
  });

  it('should find a transaction', async () => {
    const transactionRepository = new TransactionRepository();
    const transaction = new Transaction('123', '1234', '12345', 10);
    await transactionRepository.create(transaction);

    const transactionResult = await transactionRepository.find(transaction.id);

    expect(transaction).toStrictEqual(transactionResult);
  });

  it('should throw an error when transaction is not found', async () => {
    const transactionRepository = new TransactionRepository();

    expect(async () => {
      await transactionRepository.find('456ABC');
    }).rejects.toThrow('Transaction not found');
  });

  it('should find all transactions', async () => {
    const transactionRepository = new TransactionRepository();
    const transaction1 = new Transaction('123', '1234', '12345', 10);

    const transaction2 = new Transaction('1234', '12345', '123456', 100);

    await transactionRepository.create(transaction1);
    await transactionRepository.create(transaction2);

    const transactions = await transactionRepository.findAll();

    expect(transactions).toHaveLength(2);
    expect(transactions).toContainEqual(transaction1);
    expect(transactions).toContainEqual(transaction2);
  });
});
