import CreateTransactionUseCase from './create.transaction.usecase';

const input = {
  sender: 'existingSenderAccountId',
  receiver: 'existingReceiverAccountId',
  value: 10,
};
const MockRepository = () => {
  return {
    find: jest.fn().mockImplementation((id: string) => {
      if (id === 'existingSenderAccountId') {
        return {
          accountModel: {
            id: 'existingSenderAccountId',
            balance: 100,
          },
        };
      } else if (id === 'existingReceiverAccountId') {
        return {
          accountModel: {
            id: 'existingReceiverAccountId',
            balance: 50,
          },
        };
      }
      return null;
    }),
    findAll: jest.fn(),
    create: jest.fn().mockImplementation((transaction) => transaction),
    update: jest.fn(),
  };
};
describe('Unit Test create transaction use case', () => {
  it('should create a transaction', async () => {
    const transactionRepository = MockRepository();
    const accountRepository = MockRepository();

    const transactionCreateUseCase = new CreateTransactionUseCase(
      transactionRepository,
      accountRepository
    );

    const output = await transactionCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      sender: 'existingSenderAccountId',
      receiver: 'existingReceiverAccountId',
      value: 10,
    });
  });

  it('should thrown an error when sender is missing', async () => {
    const transactionRepository = MockRepository();
    const accountRepository = MockRepository();

    const transactionCreateUseCase = new CreateTransactionUseCase(
      transactionRepository,
      accountRepository
    );

    input.sender = '';

    await expect(transactionCreateUseCase.execute(input)).rejects.toThrow(
      'transaction: Sender is required'
    );
  });

  it('should thrown an error when receeiver is missing', async () => {
    const transactionRepository = MockRepository();
    const accountRepository = MockRepository();

    const transactionCreateUseCase = new CreateTransactionUseCase(
      transactionRepository,
      accountRepository
    );

    input.receiver = '';

    await expect(transactionCreateUseCase.execute(input)).rejects.toThrow(
      'Receiver is required'
    );
  });
});
