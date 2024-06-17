import ValidatorInterface from '../../@shared/validator/validator.interface';
import * as yup from 'yup';
import User from '../entity/user';

export default class UserYupValidator implements ValidatorInterface<User> {
  validate(entity: User): void {
    try {
      yup
        .object()
        .shape({
          name: yup.string().required('Name is required'),
          tax_id: yup.string().required('Tax_id is required'),
          password: yup.string().required('Password is required'),
        })
        .validateSync(
          {
            name: entity.name,
            tax_id: entity.tax_id,
            password: entity.password,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((erro) => {
        entity.notification.addError({
          context: 'user',
          message: erro,
        });
      });
    }
  }
}
