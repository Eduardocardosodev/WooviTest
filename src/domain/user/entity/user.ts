import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.errors';
import UserValidatorFactory from '../factory/user.validator.factory';
import { v4 as uuidv4 } from 'uuid';

export default class User extends Entity {
  private _name: string = '';
  private _tax_id: string = '';
  private _password: string = '';
  private _active: boolean = false;

  constructor(name: string, tax_id: string, password: string) {
    super();
    this._id = uuidv4();
    this._name = name;
    this._tax_id = tax_id;
    this._password = password;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get name(): string {
    return this._name;
  }

  get tax_id(): string {
    return this._tax_id;
  }

  get password(): string {
    return this._password;
  }

  validate() {
    try {
      UserValidatorFactory.create().validate(this);
    } catch (error) {
      console.error('Validation failed:', error); // Adicione este log
      throw error;
    }
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._tax_id === undefined || this._name === undefined) {
      throw new Error('Email and Name is mandatory to activate a customer');
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }
}
