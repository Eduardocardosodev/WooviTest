import RepositoryInterfaceUser from '../../@shared/repository/repository-interface';
import User from '../entity/user';

export default interface UserRepositoryInterface
  extends RepositoryInterfaceUser<User> {
  findByTaxId(tax_id: string): Promise<User>;
}
