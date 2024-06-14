import ValidatorInterface from '../../@shared/validator/validator.interface';
import Account from '../entity/account';
import AccountYupValidator from '../validator/account.yup.validator';

export default class AccountValidatorFactory {
  static create(): ValidatorInterface<Account> {
    return new AccountYupValidator();
  }
}
