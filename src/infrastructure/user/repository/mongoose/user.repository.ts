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
      userModel = await UserModel.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error('User not found');
    }

    return new User(id, userModel.name, userModel.tax_id, userModel.password);
  }

  async findAll(): Promise<User[]> {
    const userModels = await UserModel.find();

    const users = userModels.map((userModels) => {
      let user = new User(
        userModels.id,
        userModels.name,
        userModels.tax_id,
        userModels.password
      );

      return user;
    });

    return users;
  }
}