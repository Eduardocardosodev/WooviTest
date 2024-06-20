import User from '../entity/user';

export default class UserFactory {
  public static create(name: string, tax_id: string, password: string): User {
    return new User(name, tax_id, password);
  }
}
