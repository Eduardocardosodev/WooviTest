import CreateAccountUseCase from './create.account.usecase';

const input = {
  account_number: '1234',
  user_id: '123',
  balance: 10,
  user: {
    id: '12',
    name: 'Jhon',
    tax_id: '02461300087',
    password: '123456',
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};
describe('Unit Test create account use case', () => {
  it('should create a account', async () => {
    const accountRepository = MockRepository();
    const accountCreateUseCase = new CreateAccountUseCase(accountRepository);

    const output = await accountCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      account_number: '1234',
      user_id: '123',
      balance: 10,
      user: {
        id: '12',
        name: 'Jhon',
        tax_id: '02461300087',
        password: '123456',
      },
    });
  });

  it('should thrown an error when account_number is missing', async () => {
    const accountRepository = MockRepository();
    const accountCreateUseCase = new CreateAccountUseCase(accountRepository);

    input.account_number = '';

    await expect(accountCreateUseCase.execute(input)).rejects.toThrow(
      'Account number is required'
    );
  });

  it('should thrown an error when user name is missing', async () => {
    const accountRepository = MockRepository();
    const accountCreateUseCase = new CreateAccountUseCase(accountRepository);

    input.user.name = '';

    await expect(accountCreateUseCase.execute(input)).rejects.toThrow(
      'Name is required'
    );
  });
});
