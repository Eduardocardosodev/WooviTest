import User from '../../user/entity/user';
import AccountFactory from './account.factory';

describe('Account factory unit test', () => {
  it('should create a account', () => {
    const user = new User('John', '02461300087', 'password');
    let account = AccountFactory.create(10, user);
    console.log('account facotyr', account);

    expect(account.account_number).toEqual(expect.any(String));
    expect(account.user.name).toBe('John');
    expect(account.user_id).toEqual(expect.any(String));

    expect(account.balance).toBe(10);
  });

  it('should create a account with an user', () => {
    const user = new User('John', '02461300087', 'password');

    let account = AccountFactory.createWithUser(0, user);

    console.log(account.user);
    console.log(user);

    expect(user.name).toBe('John');
    expect(account.user).toBe(user);
  });
});
