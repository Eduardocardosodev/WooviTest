import RepositoryInterface from '../../@shared/repository/repository-interface';
import Transaction from '../entity/transaction';

export default interface TransactionRepositoryInterface
  extends RepositoryInterface<Transaction | any> {}
