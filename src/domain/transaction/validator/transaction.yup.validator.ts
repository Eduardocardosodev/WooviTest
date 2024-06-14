import ValidatorInterface from '../../@shared/validator/validator.interface';
import * as yup from 'yup';
import Transaction from '../entity/transaction';

export default class TransactionYupValidator
  implements ValidatorInterface<Transaction>
{
  validate(entity: Transaction): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          sender: yup.string().required('Sender is required'),
          receiver: yup.string().required('Receiver is required'),
          value: yup.string().required('Value is required'),
        })
        .validateSync(
          {
            id: entity.id,
            sender: entity.sender,
            receiver: entity.receiver,
            value: entity.value,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((erro) => {
        entity.notification.addError({
          context: 'transaction',
          message: erro,
        });
      });
    }
  }
}
