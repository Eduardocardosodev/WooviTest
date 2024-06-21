import mongoose from 'mongoose';
import AccountRepository from './account.repository';
import Account from '../../../../domain/account/entity/account';
import { AccountModel } from './account.model';
import User from '../../../../domain/user/entity/user';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid'; // Importe a função uuidv4 para gerar UUIDs únicos

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

  it('should create a Account', async () => {
    const accountRepository = new AccountRepository();

    const user = new User('Jhon', '12345', 'password');
    const account = new Account(10, user);
    account.User = user;

    await accountRepository.create(account);

    const accountModel = await AccountModel.findOne({
      _id: account.id,
    });

    expect(accountModel).toBeTruthy();

    expect(accountModel.toJSON()).toEqual({
      _id: expect.any(String),
      account_number: expect.any(String),
      balance: expect.objectContaining({
        _bsontype: 'Decimal128',
        bytes: expect.any(Buffer),
      }),
      user_id: account.user_id,
      date: expect.any(Date),
      __v: 0,
    });
  });

  it('should throw an error when Account is not found', async () => {
    const accountRepository = new AccountRepository();

    await expect(async () => {
      await accountRepository.find('456ABC');
    }).rejects.toThrow('Account not found');
  });

  it('should find all Accounts', async () => {
    const user1 = new User('Jhon', uuidv4(), 'password');
    const user2 = new User('Jhon', uuidv4(), 'password');

    const accountRepository = new AccountRepository();
    const account1 = new Account(10, user1);
    const account2 = new Account(100, user2);

    await accountRepository.create(account1);
    await accountRepository.create(account2);

    const accounts = await accountRepository.findAll();

    expect(accounts).toHaveLength(2);

    // Verifica se cada conta criada está presente no array de contas retornadas
    const account1Found = accounts.some(
      (acc) =>
        acc.balance === account1.balance && acc.user.tax_id === user1.tax_id
    );
    const account2Found = accounts.some(
      (acc) =>
        acc.balance === account2.balance && acc.user.tax_id === user2.tax_id
    );

    expect(account1Found).toBe(true);
    expect(account2Found).toBe(true);
  });
});
