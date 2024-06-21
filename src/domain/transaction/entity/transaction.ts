import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.errors';
import TransactionValidatorFactory from '../factory/transaction.validator.factory';
import { v4 as uuid } from 'uuid';

export default class Transaction extends Entity {
  private _sender: string = '';
  private _receiver: string = '';
  private _value: number = 0;

  constructor(sender: string, receiver: string, value: number) {
    super();
    this._id = uuid();
    this._sender = sender;
    this._receiver = receiver;
    this._value = value;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get sender(): string {
    return this._sender;
  }

  get receiver(): string {
    return this._receiver;
  }

  get value(): number {
    return this._value;
  }

  validate() {
    TransactionValidatorFactory.create().validate(this);
  }
}
