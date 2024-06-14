import Account from './account';

describe('Account unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      let account = new Account('', '23', '1', 10);
    }).toThrowError('account: Id is required');
  });

  it('should throw error when account_number is empty', () => {
    expect(() => {
      let account = new Account('123', '', '1', 10);
    }).toThrowError('account: Account number is required');
  });

  it('should throw error when account_number is and id are empty', () => {
    expect(() => {
      let account = new Account('', '', '1', 10);
    }).toThrowError(
      'account: Id is required,account: Account number is required'
    );
  });

  it('should add balance', () => {
    let account = new Account('123', '23', '1', 0);
    expect(account.balance).toBe(0);

    account.addRewardPoints(10);
    expect(account.balance).toBe(10);

    account.addRewardPoints(10);
    expect(account.balance).toBe(20);
  });
});
