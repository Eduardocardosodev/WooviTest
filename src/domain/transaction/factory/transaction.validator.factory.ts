import ValidatorInterface from '../../@shared/validator/validator.interface';
import Transaction from '../entity/transaction';
import TransactionYupValidator from '../validator/transaction.yup.validator';

export default class TransactionValidatorFactory {
  static create(): ValidatorInterface<Transaction> {
    return new TransactionYupValidator();
  }
}
