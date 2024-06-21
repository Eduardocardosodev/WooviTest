import UserRepositoryInterface from '../../../domain/user/repository/user-repository.interface';

import JWT from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import User from '../../../domain/user/entity/user';
import dotenv from 'dotenv';
import { OutputFindByTaxIdDto } from '../../../infrastructure/user/repository/mongoose/user.repository.dto';
dotenv.config();

export interface InputCreateAuthenticateDto {
  tax_id: string;
  password: string;
}

export interface OutputCreateAuthenticateDto {
  user: OutputFindByTaxIdDto;
  token: string;
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({
    tax_id,
    password,
  }: InputCreateAuthenticateDto): Promise<OutputCreateAuthenticateDto> {
    const user = await this.userRepository.findByTaxId(tax_id);

    if (!user) {
      throw new Error('User not found');
    }

    const doesPasswordMatches = await compare(password, user.password);

    const token = JWT.sign(
      {
        id: user.id,
        name: user.name,
        tax_id: user.tax_id,
        password: user.password,
      },
      process.env.JWT_SECRET || '',
      {
        expiresIn: '1h',
      }
    );

    if (!doesPasswordMatches) {
      throw new Error('Invalid Credentials 2');
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        tax_id: user.tax_id,
        password: user.password,
      },
      token,
    };
  }
}
