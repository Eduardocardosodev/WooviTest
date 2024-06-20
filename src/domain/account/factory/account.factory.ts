import Account from '../entity/account';
import User from '../../user/entity/user';

export default class AccountFactory {
  public static create(balance: number, user: User): Account {
    return new Account(balance, user);
  }

  public static createWithUser(balance: number, user: User): Account {
    const account = new Account(balance, user);
    account.changeUser(user);
    return account;
  }
}
