import User from '../../../../domain/user/entity/user';
import UserRepositoryInterface from '../../../../domain/user/repository/user-repository.interface';
import { UserModel } from './user.model';

export default class UserRepository implements UserRepositoryInterface {
  async create(entity: User): Promise<void> {
    await UserModel.create({
      name: entity.name,
      tax_id: entity.tax_id,
      password: entity.password,
      date: new Date(),
    });
  }

  async update(entity: User): Promise<void> {
    await UserModel.updateOne(
      {
        name: entity.name,
        tax_id: entity.tax_id,
        password: entity.password,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<User> {
    let userModel;
    try {
      userModel = await UserModel.findById(id);
    } catch (error) {
      throw new Error('User not found');
    }

    return new User(userModel.name, userModel.tax_id, userModel.password);
  }

  async findByTaxId(tax_id: string): Promise<User> {
    let userModel;
    console.log('usermodel===', tax_id);

    userModel = await UserModel.findOne({
      tax_id,
    });

    if (!userModel) {
      throw new Error('User not found');
    }

    return new User(userModel.name, userModel.tax_id, userModel.password);
  }

  async findAll(): Promise<User[]> {
    const userModels = await UserModel.find();

    const users = userModels.map((userModels) => {
      let user = new User(
        userModels.name,
        userModels.tax_id,
        userModels.password
      );

      return user;
    });

    return users;
  }
}
