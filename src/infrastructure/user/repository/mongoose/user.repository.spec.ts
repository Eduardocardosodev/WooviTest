import mongoose, { Mongoose } from 'mongoose';
import UserRepository from './user.repository';
import User from '../../../../domain/user/entity/user';
import { UserModel } from './user.model';

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

describe('User repository test', () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ingyz5d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
      );
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  });

  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });

  it('should create a User', async () => {
    const userRepository = new UserRepository();
    const user = new User('123', '1234', '12345', 'password');
    await userRepository.create(user);

    const userModel = await UserModel.findOne({
      where: { id: '123' },
    });

    expect(userModel.toJSON()).toStrictEqual({
      id: '123',
      name: user.name,
      tax_id: user.tax_id,
      password: user.password,
    });
  });

  it('should find a User', async () => {
    const userRepository = new UserRepository();
    const user = new User('123', '1234', '12345', 'password');
    await userRepository.create(user);

    const userResult = await userRepository.find(user.id);

    expect(user).toStrictEqual(userResult);
  });

  it('should throw an error when user is not found', async () => {
    const userRepository = new UserRepository();

    expect(async () => {
      await userRepository.find('456ABC');
    }).rejects.toThrow('user not found');
  });

  it('should find all users', async () => {
    const userRepository = new UserRepository();
    const user1 = new User('123', '1234', '12345', 'password');

    const user2 = new User('1234', '12345', '123456', 'password');

    await userRepository.create(user1);
    await userRepository.create(user2);

    const users = await userRepository.findAll();

    expect(users).toHaveLength(2);
    expect(users).toContainEqual(user1);
    expect(users).toContainEqual(user2);
  });
});
