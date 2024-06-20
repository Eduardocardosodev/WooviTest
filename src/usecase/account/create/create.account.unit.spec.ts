import CreateAccountUseCase from './create.account.usecase';

const input = {
  balance: 10,
  user: {
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
      account_number: expect.any(String),
      user_id: expect.any(String),
      balance: 10,
      user: {
        id: expect.any(String),
        name: 'Jhon',
        tax_id: '02461300087',
        password: expect.any(String),
      },
    });
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
