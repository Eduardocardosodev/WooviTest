import Account from '../../account/entity/account';
import AccountFactory from '../../account/factory/account.factory';
import UserFactory from './user.factory';

describe('User factory unit test', () => {
  it('should create a user', () => {
    let user = UserFactory.create('John', '02461300087', '1234');

    expect(user.id).toBeDefined();
    expect(user.name).toBe('John');
    expect(user.tax_id).toBe('02461300087');
    expect(user.password).toBe('1234');
  });
});
