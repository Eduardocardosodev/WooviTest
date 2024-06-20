import User from './user';

describe('User unit tests', () => {
  it('should throw error when name is empty', () => {
    expect(() => {
      let user = new User('', '02461300087', 'password');
    }).toThrowError('user: Name is required');
  });

  it('should throw error when password is empty', () => {
    expect(() => {
      let user = new User('John', '02461300087', '');
    }).toThrowError('user: Password is required');
  });

  it('should throw error when name and password are empty', () => {
    expect(() => {
      let user = new User('', '02461300087', '');
    }).toThrowError('user: Name is required,user: Password is required');
  });
});
