import { v4 as uuid } from 'uuid';
import User from '../entity/user';

export default class UserFactory {
  public static create(name: string, tax_id: string, password: string): User {
    return new User(uuid(), name, tax_id, password);
  }
}
