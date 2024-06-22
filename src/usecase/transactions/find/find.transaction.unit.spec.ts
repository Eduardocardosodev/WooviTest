import Transaction from '../../../domain/transaction/entity/transaction';
import FindTransactionUseCase from './find.transaction.usecase';
import { v4 as uuid } from 'uuid';

const transactionId = uuid();

const transaction = new Transaction('sender_id', 'receiver_id', 100);
transaction['_id'] = transactionId; // Define o ID da transação
const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(transaction)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
};
describe('Unit Test find transaction use case', () => {
  it('should find a transaction', async () => {
    const transactionRepository = MockRepository();
    const useCase = new FindTransactionUseCase(transactionRepository);

    const input = {
      id: transactionId,
    };

    const output = {
      id: transactionId,
      sender: 'sender_id',
      receiver: 'receiver_id',
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
