import { v4 as uuid } from 'uuid';
import Account from '../entity/account';
import User from '../../user/entity/user';

export default class AccountFactory {
  public static create(
    account_number: string,
    user_id: string,
    balance: number
  ): Account {
    return new Account(uuid(), account_number, user_id, balance);
  }

  public static createWithUser(
    account_number: string,
    user_id: string,
    balance: number,
    user: User
  ): Account {
    const account = new Account(uuid(), account_number, user_id, balance, user);
    account.changeUser(user);
    return account;
  }
}
