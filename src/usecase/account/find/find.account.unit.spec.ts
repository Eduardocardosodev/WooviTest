import { v4 as uuid } from 'uuid';
import FindAccountUseCase from './find.account.usecase';
import Account from '../../../domain/account/entity/account';
import User from '../../../domain/user/entity/user';

const accountId = uuid();

const user = new User('Eduardo', 'tax_id', 'password');
const account = new Account(100, user);
account['_id'] = accountId; // Define o ID da transação
const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(account)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};
describe('Unit Test find account use case', () => {
  it('should find a account', async () => {
    const accountRepository = MockRepository();
    const useCase = new FindAccountUseCase(accountRepository);

    const input = {
      id: accountId,
    };

    const output = {
      id: accountId,
      account_number: account.account_number,
      user_id: account.user_id,
      balance: 100,
      user: {
        id: account.user.id,
        name: 'Eduardo',
        tax_id: 'tax_id',
        password: 'password',
      },
    };

    const result = await useCase.execute(input.id);

    expect(result).toEqual(output);
  });

  it('should not find a Account', () => {
    const accountRepository = MockRepository();
    accountRepository.find.mockImplementation(() => {
      throw new Error('Account not found');
    });
    const useCase = new FindAccountUseCase(accountRepository);

    const input = {
      id: '123',
    };

    expect(() => {
      return useCase.execute(input.id);
    }).rejects.toThrow('Account not found');
  });
});
