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
          account_number: yup.string().required('Account number is required'),
          user_id: yup.string().required('User Id is required'),
          balance: yup.string().required('Balance is required'),
        })
        .validateSync(
          {
            id: entity.id,
            account_number: entity.account_number,
            user_id: entity.user_id,
            balance: entity.balance,
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
