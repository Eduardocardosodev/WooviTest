import JWT, { Secret } from 'jsonwebtoken';
import { Context, Next } from 'koa';
import dotenv from 'dotenv';
dotenv.config();

export async function authMiddleware(ctx: Context, next: Next) {
  try {
    //check if token is valid
    const authHeader = ctx.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // check if header has a token
    if (!token) throw new Error('Access invalid!');
    const secretKey = process.env.JWT_SECRET || '';

    const verified = await JWT.verify(token, secretKey);

    ctx.state.competitor = verified;

    await next();
  } catch (error: any) {
    ctx.status = 401;
    ctx.body = { error: 'Authenticate error', message: error.message };
  }
}
