import UserRepositoryInterface from '../../../domain/user/repository/user-repository.interface';
import {
  AuthenticateUseCase,
  InputCreateAuthenticateDto,
} from './create.authenticate.usecase';
import User from '../../../domain/user/entity/user';
import JWT from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import dotenv from 'dotenv';

// Mock para simular o dotenv.config()
jest.mock('dotenv');
const mockDotenv = dotenv as jest.Mocked<typeof dotenv>;
mockDotenv.config.mockReturnValue(undefined);

// Mock para simular a geração de token JWT
jest.mock('jsonwebtoken');
const mockJWTSign = JWT.sign as jest.MockedFunction<typeof JWT.sign>;
mockJWTSign.mockImplementation(() => 'mock_jwt_token');

// Mock para simular a comparação de senha bcrypt
jest.mock('bcryptjs');
const mockCompare = compare as jest.MockedFunction<typeof compare>;
mockCompare.mockResolvedValue(true as never); // Resolve como verdadeiro, ajustando o tipo para never

describe('AuthenticateUseCase', () => {
  const mockUser: User = new User('John Doe', '02461300087', 'hashed_password');
  const mockUserRepository: UserRepositoryInterface = {
    findByTaxId: jest.fn((tax_id: string) => {
      if (tax_id === '02461300087') {
        return Promise.resolve(mockUser);
      } else {
        return Promise.resolve(null);
      }
    }),
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
  };

  const authenticateUseCase = new AuthenticateUseCase(mockUserRepository);

  it('should authenticate successfully', async () => {
    const input: InputCreateAuthenticateDto = {
      tax_id: '02461300087',
      password: '123456',
    };

    const output = await authenticateUseCase.execute(input);

    console.log(output);

    expect(output.user.id).toBe(mockUser.id);
    expect(output.user.name).toBe(mockUser.name);
    expect(output.user.tax_id).toBe(mockUser.tax_id);

    expect(output.token).toBe('mock_jwt_token');
  });

  it('should throw an error when user is not found', async () => {
    const input: InputCreateAuthenticateDto = {
      tax_id: 'invalid_tax_id',
      password: '123456',
    };

    await expect(authenticateUseCase.execute(input)).rejects.toThrow(
      'User not found'
    );
  });

  it('should throw an error when password does not match', async () => {
    const input: InputCreateAuthenticateDto = {
      tax_id: '02461300087',
      password: 'invalid_password',
    };

    mockCompare.mockResolvedValue(false as never); // Resolvendo como falso, ajustando o tipo para never

    await expect(authenticateUseCase.execute(input)).rejects.toThrow(
      'Invalid Credentials 2'
    );
  });
});
