import Account from '../../../../domain/account/entity/account';
import AccountRepositoryInterface from '../../../../domain/account/repository/account-repository.interface';
import { OutputFindAccountDtoDb } from '../../../../usecase/account/find/find.account.dto';
import { UserModel } from '../../../user/repository/mongoose/user.model';
import { AccountModel } from './account.model';
import { OutputFindAllAccountDto } from './account.repository.dto';

export default class AccountRepository implements AccountRepositoryInterface {
  async create(entity: Account): Promise<void> {
    const user = await UserModel.create({
      _id: entity.user.id,
      name: entity.user.name,
      tax_id: entity.user.tax_id,
      password: entity.user.password,
      date: new Date(),
    });

    await AccountModel.create({
      _id: entity.id,
      user_id: user.id,
      account_number: entity.account_number,
      balance: entity.balance,
      date: new Date(),
    });
  }

  async update(entity: Account | any): Promise<void> {
    await AccountModel.findByIdAndUpdate(entity.id, {
      balance: entity.balance,
    });
  }

  async find(id: string): Promise<OutputFindAccountDtoDb | null> {
    const accountModel = await AccountModel.findById(id);

    const userModel = await UserModel.findById(accountModel?.user_id);

    if (!accountModel) {
      throw new Error('Account not found');
    }
    return {
      accountModel: {
        id: accountModel._id,
        account_number: accountModel.account_number,
        user_id: accountModel.user_id,
        balance: Number(accountModel.balance),
      },
      userModel: {
        id: String(userModel._id),
        name: userModel.name,
        tax_id: userModel.tax_id,
        password: userModel.password,
      },
    };
  }

  async findAll(): Promise<{ account: OutputFindAllAccountDto }[]> {
    const accountModels = await AccountModel.find();
    let accountWithUsers: { account: OutputFindAllAccountDto }[] = [];

    await Promise.all(
      accountModels.map(async (accountModel) => {
        const userModel = await UserModel.findById(accountModel.user_id).exec();
        const completed: { account: OutputFindAllAccountDto } = {
          account: {
            id: accountModel._id.toString(),
            account_number: accountModel.account_number,
            balance: Number(accountModel.balance),
            user_id: accountModel.user_id.toString(),
            user: {
              id: String(userModel!._id),
              name: userModel!.name,
              tax_id: userModel!.tax_id,
              password: userModel!.password,
            },
          },
        };
        accountWithUsers.push(completed);
      })
    );

    return accountWithUsers;
  }
}
