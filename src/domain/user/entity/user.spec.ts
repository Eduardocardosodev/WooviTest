import User from './user';

describe('User unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      let user = new User('', 'John', '02461300087', '1234');
    }).toThrowError('user: Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      let user = new User('123', '', '02461300087', '1234');
    }).toThrowError('user: Name is required');
  });

  it('should throw error when email is empty', () => {
    expect(() => {
      let user = new User('123', 'John', '', '1234');
    }).toThrowError('user: Tax_id is required');
  });
  it('should throw error when email is empty', () => {
    expect(() => {
      let user = new User('123', 'John', '02461300087', '');
    }).toThrowError('user: Password is required');
  });

  it('should throw error when name is and id are empty', () => {
    expect(() => {
      let user = new User('', '', '02461300087', '1234');
    }).toThrowError('user: Id is required,user: Name is required');
  });

  it('should activate user', () => {
    const user = new User('1', 'user 1', '02461300087', '1234');
    user.activate();

    expect(user.isActive()).toBe(true);
  });

  it('should deactivate user', () => {
    const user = new User('1', 'user 1', '02461300087', '1234');

    user.deactivate();

    expect(user.isActive()).toBe(false);
  });
});
