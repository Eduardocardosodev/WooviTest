import RepositoryInterface from '../../@shared/repository/repository-interface';
import Transaction from '../entity/transaction';

export default interface UserRepositoryInterface
  extends RepositoryInterface<Transaction> {}
