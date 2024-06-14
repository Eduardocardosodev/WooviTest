import RepositoryInterface from '../../@shared/repository/repository-interface';
import Account from '../entity/account';

export default interface AccountRepositoryInterface
  extends RepositoryInterface<Account> {}
