import Account from './account';

describe('Account unit tests', () => {
  it('should throw error when user is empty', () => {
    expect(() => {
      let account = new Account(10, null);
    }).toThrowError('account: User is required');
  });
});
