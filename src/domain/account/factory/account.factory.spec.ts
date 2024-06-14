import User from '../../user/entity/user';
import AccountFactory from './account.factory';

describe('Account factory unit test', () => {
  it('should create a account', () => {
    let account = AccountFactory.create('1', '1', 10);

    expect(account.id).toBeDefined();
    expect(account.account_number).toBe('1');
    expect(account.user_id).toBe('1');
    expect(account.balance).toBe(10);
  });

  it('should create a account with an user', () => {
    const user = new User('123', 'John', '02461300087', '1234');

    let account = AccountFactory.createWithUser('1', '1', 0, user);

    console.log(account.user);
    console.log(user);

    expect(user.id).toBeDefined();
    expect(user.name).toBe('John');
    expect(account.user).toBe(user);
  });
});
