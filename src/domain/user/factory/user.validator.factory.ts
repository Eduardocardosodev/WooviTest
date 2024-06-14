import ValidatorInterface from '../../@shared/validator/validator.interface';
import User from '../entity/user';
import UserYupValidator from '../validator/user.yup.validator';

export default class UserValidatorFactory {
  static create(): ValidatorInterface<User> {
    return new UserYupValidator();
  }
}
