import JWT from 'jsonwebtoken';

import { AuthChecker } from 'type-graphql';
interface Context {
  token?: string;
}

const AuthMiddlewareGraphql: AuthChecker<Context> = ({ context }): boolean => {
  const authHeader = context.token;

  if (!authHeader) {
    return false;
  }
  const secretKey = process.env.JWT_SECRET || '';

  const [, token] = authHeader.split(' ');
  if (!token) throw new Error('Access invalid!');

  try {
    const decoded = JWT.verify(token, secretKey);

    return !!decoded;
  } catch {
    return false;
  }
};

export default AuthMiddlewareGraphql;
