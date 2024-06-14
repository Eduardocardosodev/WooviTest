import Notification from './notification';

describe('Unit Test for notifications', () => {
  it('should create errors', () => {
    const notification = new Notification();
    const error = {
      message: 'error message,',
      context: 'account',
    };

    notification.addError(error);

    expect(notification.messages('account')).toBe('account: error message,');

    const error2 = {
      message: 'error message2,',
      context: 'account',
    };
    notification.addError(error2);

    expect(notification.messages('account')).toBe(
      'account: error message,account: error message2,'
    );

    const error3 = {
      message: 'error message3,',
      context: 'order',
    };
    notification.addError(error3);
    expect(notification.messages('account')).toBe(
      'account: error message,account: error message2,'
    );

    expect(notification.messages()).toBe(
      'account: error message,account: error message2,order: error message3,'
    );
  });

  it('should check if notification has at least one error', () => {
    const notification = new Notification();
    const error = {
      message: 'error message,',
      context: 'account',
    };

    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);
  });

  it('should get all erros props', () => {
    const notification = new Notification();
    const error = {
      message: 'error message,',
      context: 'account',
    };

    notification.addError(error);
    expect(notification.getErrors()).toEqual([error]);
  });
});
