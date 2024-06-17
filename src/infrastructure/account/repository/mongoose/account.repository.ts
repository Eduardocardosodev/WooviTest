import Account from '../../../../domain/account/entity/account';
import AccountRepositoryInterface from '../../../../domain/account/repository/account-repository.interface';
import { UserModel } from '../../../user/repository/mongoose/user.model';
import { AccountModel } from './account.model';

export default class AccountRepository implements AccountRepositoryInterface {
  async create(entity: Account): Promise<void> {
    const user = await UserModel.create({
      name: entity.user.name,
      tax_id: entity.user.tax_id,
      password: entity.user.password,
      date: new Date(),
    });

    console.log(user);

    await AccountModel.create({
      user_id: user.id,
      balance: 0,
      date: new Date(),
    });
  }

  async update(entity: Account | any): Promise<void> {
    console.log('UPDATE ACCOUNT.REPOSITOY ====', entity);
    await AccountModel.findByIdAndUpdate(entity.id, {
      balance: entity.balance,
    });
  }

  async find(id: string): Promise<Account> {
    let accountModel;
    try {
      accountModel = await AccountModel.findById(id);
    } catch (error) {
      throw new Error('Account not found');
    }

    return new Account(
      id,
      accountModel.account_number,
      accountModel.user_id,
      Number(accountModel.balance)
    );
  }

  async findAll(): Promise<Account[]> {
    const accountModels = await AccountModel.find();

    const accounts = accountModels.map((accountModels) => {
      let account = new Account(
        accountModels.id,
        accountModels.account_number,
        accountModels.user_id,
        Number(accountModels.balance)
      );

      return account;
    });

    return accounts;
  }
}
