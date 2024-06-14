import TransactionFactory from './transaction.factory';

describe('Transaction factory unit test', () => {
  it('should create a user', () => {
    let transaction = TransactionFactory.create('123', '1234', 10);

    expect(transaction.id).toBeDefined();
    expect(transaction.sender).toBe('123');
    expect(transaction.receiver).toBe('1234');
    expect(transaction.value).toBe(10);
  });
});
