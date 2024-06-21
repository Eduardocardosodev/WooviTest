import JWT from 'jsonwebtoken';
// import { Context, Next } from 'koa';
// import dotenv from 'dotenv';
// dotenv.config();

import { AuthChecker } from 'type-graphql';

// export async function authMiddleware(ctx: Context, next: Next) {
//   try {
//     //check if token is valid
//     const authHeader = ctx.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     // check if header has a token
//     if (!token) throw new Error('Access invalid!');
//     const secretKey = process.env.JWT_SECRET || '';

//     const verified = await JWT.verify(token, secretKey);

//     ctx.state.account = verified;

//     await next();
//   } catch (error: any) {
//     ctx.status = 401;
//     ctx.body = { error: 'Authenticate error', message: error.message };
//   }
// }

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
