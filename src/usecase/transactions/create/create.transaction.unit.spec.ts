import CreateTransactionUseCase from './create.transaction.usecase';

const input = {
  sender: '1234',
  receiver: '123',
  value: 10,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};
describe('Unit Test create transaction use case', () => {
  it('should create a transaction', async () => {
    const transactionRepository = MockRepository();
    const transactionCreateUseCase = new CreateTransactionUseCase(
      transactionRepository
    );

    const output = await transactionCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      sender: '1234',
      receiver: '123',
      value: 10,
    });
  });

  it('should thrown an error when sender is missing', async () => {
    const transactionRepository = MockRepository();
    const transactionCreateUseCase = new CreateTransactionUseCase(
      transactionRepository
    );

    input.sender = '';

    await expect(transactionCreateUseCase.execute(input)).rejects.toThrow(
      'Sender is required'
    );
  });

  it('should thrown an error when receeiver is missing', async () => {
    const transactionRepository = MockRepository();
    const transactionCreateUseCase = new CreateTransactionUseCase(
      transactionRepository
    );

    input.receiver = '';

    await expect(transactionCreateUseCase.execute(input)).rejects.toThrow(
      'Receiver is required'
    );
  });
});
