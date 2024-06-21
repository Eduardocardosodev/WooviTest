import ValidatorInterface from '../../@shared/validator/validator.interface';
import * as yup from 'yup';
import Account from '../entity/account';

export default class AccountYupValidator
  implements ValidatorInterface<Account>
{
  validate(entity: Account): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          balance: yup.string().required('Balance is required'),
          user: yup
            .object()
            .shape({
              id: yup.string().required('User ID is required'),
              name: yup.string().required('User name is required'),
              tax_id: yup.string().required('User tax ID is required'),
            })
            .required('User is required'),
        })
        .validateSync(
          {
            id: entity.id,
            balance: entity.balance,
            user: entity.user
              ? {
                  // Protege contra user nulo
                  id: entity.user.id,
                  name: entity.user.name,
                  tax_id: entity.user.tax_id,
                }
              : null,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((erro) => {
        entity.notification.addError({
          context: 'account',
          message: erro,
        });
      });
    }
  }
}
