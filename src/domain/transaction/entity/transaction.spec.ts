import Transaction from './transaction';

describe('User unit tests', () => {
  it('should throw error when sender is empty', () => {
    expect(() => {
      let transaction = new Transaction('', '1234', 10);
    }).toThrowError('transaction: Sender is required');
  });

  it('should throw error when receiver is empty', () => {
    expect(() => {
      let transaction = new Transaction('123', '', 10);
    }).toThrowError('transaction: Receiver is required');
  });

  it('should throw error when value is empty', () => {
    expect(() => {
      let transaction = new Transaction('123', '1234', undefined);
    }).toThrowError('transaction: Value is required');
  });

  it('should throw error when sender is and receiver are empty', () => {
    expect(() => {
      let transaction = new Transaction('', '', 10);
    }).toThrowError(
      'transaction: Sender is required,transaction: Receiver is required'
    );
  });
});
