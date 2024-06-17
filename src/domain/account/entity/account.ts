import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.errors';
import User from '../../user/entity/user';
import AccountValidatorFactory from '../factory/account.validator.factory';

export default class Account extends Entity {
  private _account_number: string = '';
  private _user_id: string = '';
  private _balance: number = 0;
  private _user?: User;

  constructor(
    id: string,
    account_number: string,
    user_id: string,
    balance: number,
    user?: User
  ) {
    super();
    this._id = id;
    this._account_number = account_number;
    this._user_id = user_id;
    this._balance = balance;
    this._user = user;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get account_number(): string {
    return this._account_number;
  }

  get user_id(): string {
    return this._user_id;
  }

  get balance(): number {
    return this._balance;
  }

  get user(): User {
    return this._user;
  }

  validate() {
    AccountValidatorFactory.create().validate(this);
  }

  changeUser(user: User) {
    this._user = user;
  }

  addRewardPoints(cash: number) {
    this._balance += cash;
  }

  set User(user: User) {
    this._user = user;
  }
}
