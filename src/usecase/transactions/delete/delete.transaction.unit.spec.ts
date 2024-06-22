import DeletetransactionUseCase from './delete.transaction.usecase';

const input = {
  id: '5e88f484-5532-4789-a74c-390bed2c88e2',
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn().mockResolvedValue({}),
    update: jest.fn(),
    create: jest.fn(),
  };
};
describe('Unit Test delete transaction use case', () => {
  it('should delete a transaction', async () => {
    const transactionRepository = MockRepository();
    const accountRepository = MockRepository();

    transactionRepository.find.mockResolvedValue({
      id: input.id,
      accountSenderId: 'sender-account-id',
      accountReceiverId: 'receiver-account-id',
      value: 100,
    });

    accountRepository.find.mockResolvedValueOnce({
      id: 'sender-account-id',
      accountModel: { balance: 500 },
    });
    accountRepository.find.mockResolvedValueOnce({
      id: 'receiver-account-id',
      accountModel: { balance: 300 },
    });

    const transactiondeleteUseCase = new DeletetransactionUseCase(
      transactionRepository,
      accountRepository
    );

    const output = await transactiondeleteUseCase.execute(input);

    expect(transactionRepository.delete).toHaveBeenCalledWith(input.id);
    expect(output).toEqual({
      message: 'Transaction successfully deleted',
    });
  });

  it('should thrown an error when transaction is not delete', async () => {
    const transactionRepository = MockRepository();
    const accountRepository = MockRepository();

    const transactiondeleteUseCase = new DeletetransactionUseCase(
      transactionRepository,
      accountRepository
    );

    input.id = '';

    await expect(transactiondeleteUseCase.execute(input)).rejects.toThrow(
      'Id is required'
    );
  });
});
