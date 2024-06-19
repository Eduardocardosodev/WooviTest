import mongoose from 'mongoose';
import Account from '../../../../domain/account/entity/account';
import AccountRepositoryInterface from '../../../../domain/account/repository/account-repository.interface';
import User from '../../../../domain/user/entity/user';
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

    await AccountModel.create({
      user_id: user.id,
      account_number: entity.account_number,
      balance: entity.balance,
      date: new Date(),
    });
  }

  async update(entity: Account | any): Promise<void> {
    await AccountModel.findByIdAndUpdate(
      entity.id,
      { balance: entity.balance },
      { new: true } // Retorna o documento atualizado
    );
  }

  async find(id: string): Promise<Account | null> {
    let accountModel;

    accountModel = await AccountModel.findById(id);

    const userModel = await UserModel.findById(accountModel.user_id);

    const user = new User(userModel.name, userModel.tax_id, userModel.password);
    return new Account(Number(accountModel.balance), user);
  }

  async findAll(): Promise<Account[]> {
    const accountModels = await AccountModel.find();

    const accounts = await Promise.all(
      accountModels.map(async (accountModel) => {
        const userModel = await UserModel.findById(accountModel.user_id).exec();
        if (!userModel) {
          throw new Error('User not found');
        }

        const user = new User(
          userModel.name,
          userModel.tax_id,
          userModel.password
        );
        return new Account(Number(accountModel.balance), user);
      })
    );

    return accounts;
  }
}
