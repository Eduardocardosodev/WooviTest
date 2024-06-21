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

  it('should create a transaction', async () => {
    const transactionRepository = new TransactionRepository();
    const transaction = new Transaction('sender_id', 'receiver_id', 100);
    await transactionRepository.create(transaction);

    const transactionModel = await TransactionModel.findById(transaction.id);

    expect(transactionModel).toBeDefined();
    expect(transactionModel.sender).toBe(transaction.sender);
    expect(transactionModel.receiver).toBe(transaction.receiver);
    expect(transactionModel.value.toString()).toBe(
      transaction.value.toString()
    );
  });

  it('should find a transaction', async () => {
    const transactionRepository = new TransactionRepository();
    const transaction = new Transaction('sender_id', 'receiver_id', 100);
    await transactionRepository.create(transaction);

    const transactionResult = await transactionRepository.find(transaction.id);

    expect(transactionResult.sender).toBe(transaction.sender);
    expect(transactionResult.receiver).toBe(transaction.receiver);
    expect(Number(transactionResult.value)).toBe(Number(transaction.value));
  });

  it('should throw an error when transaction is not found', async () => {
    const transactionRepository = new TransactionRepository();

    expect(async () => {
      await transactionRepository.find('6674782424f2731222615cb4');
    }).rejects.toThrow('Transaction not found');
  });

  it('should find all transactions', async () => {
    const transactionRepository = new TransactionRepository();
    const transaction1 = new Transaction('sender_id', 'receiver_id', 10);

    const transaction2 = new Transaction('sender_id', 'receiver_id3', 100);

    await transactionRepository.create(transaction1);
    await transactionRepository.create(transaction2);

    const transactions = await transactionRepository.findAll();

    // Mapeando os usuários para um formato de objeto simples
    const transactionObjects = transactions.map((transaction) => ({
      _id: transaction.transactions.id,
      sender: transaction.transactions.sender,
      receiver: transaction.transactions.receiver,
      value: transaction.transactions.value,
    }));

    expect(transactionObjects).toHaveLength(2);
    expect(transactionObjects).toContainEqual({
      _id: expect.any(String),
      sender: transaction1.sender,
      receiver: transaction1.receiver,
      value: transaction1.value,
      notification: { errors: [] },
    });
    expect(transactionObjects).toContainEqual({
      _id: expect.any(String),
      sender: transaction2.sender,
      receiver: transaction2.receiver,
      value: transaction2.value,
      notification: { errors: [] },
    });
  });
});
