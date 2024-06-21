import AccountFactory from '../../../domain/account/factory/account.factory';
import AccountRepositoryInterface from '../../../domain/account/repository/account-repository.interface';
import UserFactory from '../../../domain/user/factory/user.factory';
import ListAccountUseCase from './list.account.usecase';

const user1 = UserFactory.create('Eduardo', 'tax_id', 'password');
const user2 = UserFactory.create('Eduardo2', 'tax_id2', 'password');

const account1 = AccountFactory.create(100, user1);
const account2 = AccountFactory.create(102, user2);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([account1, account2])),
  } as unknown as AccountRepositoryInterface;
};

describe('Unit Test for listing account use case', () => {
  it('should list a account', async () => {
    const repository = MockRepository();
    const usecase = new ListAccountUseCase(repository);

    const output = await usecase.execute();

    expect(output.length).toBe(2);
    expect(output[0].id).toBe(account1.id);

    expect(output[0].balance).toBe(account1.balance);

    expect(output[0].account_number).toBe(account1.account_number);

    expect(output[1].id).toBe(account2.id);
    expect(output[1].balance).toBe(account2.balance);
    expect(output[1].account_number).toBe(account2.account_number);
  });
});
