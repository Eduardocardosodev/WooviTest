import TransactionFactory from '../../../domain/transaction/factory/transaction.factory';
import ListTransactionUseCase from './list.transaction.usecase';

const transaction1 = TransactionFactory.create('123', '1234', 100);

const transaction2 = TransactionFactory.create('1234', '12345', 102);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest
      .fn()
      .mockReturnValue(Promise.resolve([transaction1, transaction2])),
    delete: jest.fn(),
  };
};

describe('Unit Test for listing transaction use case', () => {
  it('should list a transaction', async () => {
    const repository = MockRepository();
    const usecase = new ListTransactionUseCase(repository);

    const output = await usecase.execute();

    expect(output.length).toBe(2);
    expect(output[0].id).toBe(transaction1.id);

    expect(output[0].sender).toBe(transaction1.sender);

    expect(output[0].receiver).toBe(transaction1.receiver);

    expect(output[1].id).toBe(transaction2.id);
    expect(output[1].sender).toBe(transaction2.sender);
    expect(output[1].receiver).toBe(transaction2.receiver);
  });
});
