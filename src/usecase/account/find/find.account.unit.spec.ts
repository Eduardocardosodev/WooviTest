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
    delete: jest.fn(),
  };
};
describe('Unit Test find account use case', () => {
  it('should find a account', async () => {
    const accountRepository = MockRepository();
    const useCase = new FindAccountUseCase(accountRepository);

    // Simulando retorno válido do repositório
    accountRepository.find.mockResolvedValue({
      accountModel: {
        _id: '05a0f236-9129-4149-aae0-f8af83a6b135',
        account_number: 'cb615956-4b9a-4b66-a532-31f1084ce5a1',
        user_id: '80ae57b3-d706-48c3-b696-8953cdd2866f',
        balance: 100,
      },
      userModel: {
        id: '80ae57b3-d706-48c3-b696-8953cdd2866f',
        name: 'Eduardo',
        tax_id: 'tax_id',
        password: 'password',
      },
    });

    const input = {
      id: accountId,
    };

    const output = {
      id: '05a0f236-9129-4149-aae0-f8af83a6b135',
      account_number: 'cb615956-4b9a-4b66-a532-31f1084ce5a1',
      user_id: '80ae57b3-d706-48c3-b696-8953cdd2866f',
      balance: 100,
      user: {
        id: '80ae57b3-d706-48c3-b696-8953cdd2866f',
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
