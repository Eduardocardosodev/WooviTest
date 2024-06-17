import mongoose, { Mongoose } from 'mongoose';
import AccountRepository from './account.repository';
import Account from '../../../../domain/account/entity/account';
import { AccountModel } from './account.model';
import UserRepository from '../../../user/repository/mongoose/user.repository';
import User from '../../../../domain/user/entity/user';
import dotenv from 'dotenv';

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
describe('Account repository test', () => {
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
    await AccountModel.deleteMany({});
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });

  it('should create a Account', async () => {
    const userRepository = new UserRepository();
    const user = new User('123', '1234', '12345', 'password');
    const account = new Account('123', '1234', '12345', 10, user);

    console.log(account);

    const accountModel = await AccountModel.findOne({
      where: { id: '123' },
    });

    expect(accountModel.toJSON()).toStrictEqual({
      id: '123',
      account_number: account.account_number,
      user_id: account.user_id,
      balance: account.balance,
    });
  });

  it('should throw an error when Account is not found', async () => {
    const accountRepository = new AccountRepository();

    expect(async () => {
      await accountRepository.find('456ABC');
    }).rejects.toThrow('Account not found');
  });

  it('should find all Accounts', async () => {
    const accountRepository = new AccountRepository();
    const account1 = new Account('123', '1234', '12345', 10);

    const account2 = new Account('1234', '12345', '123456', 100);

    await accountRepository.create(account1);
    await accountRepository.create(account2);

    const Accounts = await accountRepository.findAll();

    expect(Accounts).toHaveLength(2);
    expect(Accounts).toContainEqual(account1);
    expect(Accounts).toContainEqual(account2);
  });
});
