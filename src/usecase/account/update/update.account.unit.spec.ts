import AccountFactory from '../../../domain/account/factory/account.factory';
import UserFactory from '../../../domain/user/factory/user.factory';
import UpdateAccountUseCase from './update.account.usecase';

const user = UserFactory.create('Eduardo', 'tax_id', 'password');

const account = AccountFactory.create(100, user);

const input = {
  id: account.id,
  account_number: account.account_number,
  balance: account.balance,
  user_id: account.user_id,
  user: {
    id: user.id,
    name: user.name,
    tax_id: user.tax_id,
    password: user.password,
  },
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(account)),
    update: jest.fn(),
  };
};

describe('Unit Test for account update use case', () => {
  it('should update a account', async () => {
    const accountRepository = MockRepository();
    const accountUpdateUseCase = new UpdateAccountUseCase(accountRepository);
    const output = await accountUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
