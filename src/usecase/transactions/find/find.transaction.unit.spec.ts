import Transaction from '../../../domain/transaction/entity/transaction';
import FindTransactionUseCase from './find.transaction.usecase';

const transaction = new Transaction('123', '1234', '12355', 100);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(transaction)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};
describe('Unit Test find transaction use case', () => {
  it('should find a transaction', async () => {
    const transactionRepository = MockRepository();
    const useCase = new FindTransactionUseCase(transactionRepository);

    const input = {
      id: '123',
    };

    const output = {
      id: '123',
      sender: '1234',
      receiver: '12355',
      value: 100,
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it('shloud not find a transaction', () => {
    const transactionRepository = MockRepository();
    transactionRepository.find.mockImplementation(() => {
      throw new Error('Transaction not found');
    });
    const useCase = new FindTransactionUseCase(transactionRepository);

    const input = {
      id: '123',
    };

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow('Transaction not found');
  });
});
