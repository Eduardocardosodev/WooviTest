import mongoose, { Mongoose } from 'mongoose';
import UserRepository from './user.repository';
import User from '../../../../domain/user/entity/user';
import { UserModel } from './user.model';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';

dotenv.config();

describe('User repository test', () => {
  beforeAll(async () => {
    const DB_USER = process.env.DB_USER;
    const DB_PASSWORD = process.env.DB_PASSWORD;
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

  it('should create a User', async () => {
    const userRepository = new UserRepository();
    const user = new User('Eduardo', uuid(), 'password');
    await userRepository.create(user);

    const userModel = await UserModel.findById(user.id);

    expect(userModel).not.toBeNull();
    expect(userModel.toJSON()).toStrictEqual({
      _id: user.id,
      name: user.name,
      tax_id: user.tax_id,
      password: user.password,
      active: true,
      date: expect.any(Date),
      __v: 0,
    });
  });

  it('should find a User', async () => {
    const userRepository = new UserRepository();

    const user = new User('Eduardo', '12345', 'password');

    await userRepository.create(user);

    const userResult = await userRepository.find(user.id);

    expect(userResult.name).toEqual(user.name);
    expect(userResult.tax_id).toEqual(user.tax_id);
    expect(userResult.password).toEqual(user.password);
  });

  it('should throw an error when user is not found', async () => {
    const userRepository = new UserRepository();

    expect(async () => {
      await userRepository.find('456ABC');
    }).rejects.toThrow('User not found');
  });

  it('should find all users', async () => {
    const userRepository = new UserRepository();
    const user1 = new User('Eduardo', '12345', 'password');

    const user2 = new User('Eduardo', '123455', 'password');

    await userRepository.create(user1);
    await userRepository.create(user2);

    const users = await userRepository.findAll();

    // Mapeando os usuários para um formato de objeto simples
    const userObjects = users.map((user) => ({
      _id: user.id,
      _name: user.name,
      _tax_id: user.tax_id,
      _password: user.password,
      _active: user.isActive(),
      notification: user.notification,
    }));

    expect(userObjects).toHaveLength(2);
    expect(userObjects).toContainEqual({
      _id: expect.any(String),
      _name: user1.name,
      _tax_id: user1.tax_id,
      _password: user1.password,
      _active: user1.isActive(),
      notification: { errors: [] },
    });
    expect(userObjects).toContainEqual({
      _id: expect.any(String),
      _name: user2.name,
      _tax_id: user2.tax_id,
      _password: user2.password,
      _active: user2.isActive(),
      notification: { errors: [] },
    });
  });
});
