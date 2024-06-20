import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import AuthSchema from '../schemaGraphql/authenticate.schema.graphql';
import UserRepositoryInterface from '../../../domain/user/repository/user-repository.interface';
import { compare } from 'bcryptjs';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

@Resolver(AuthSchema)
class AuthController {
  @Mutation((returns) => AuthSchema)
  async signIn(
    @Arg('tax_id') tax_id: string,
    @Arg('password') password: string,
    @Ctx() context: { userRepository: UserRepositoryInterface }
  ) {
    const { userRepository } = context;

    const user = await userRepository.findByTaxId(tax_id);

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
      throw new Error('Incorrect email/password combination.');
    }

    return {
      token,
      user,
    };
  }
}

export default AuthController;
