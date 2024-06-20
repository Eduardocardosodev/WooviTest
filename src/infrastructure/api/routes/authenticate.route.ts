import Router from 'koa-router';
import {
  AuthenticateUseCase,
  InputCreateAuthenticateDto,
} from '../../../usecase/authenticate/create/create.authenticate.usecase';
import UserRepository from '../../user/repository/mongoose/user.repository';

export const authenticateRoute = new Router();

authenticateRoute.post('/', async (ctx, next) => {
  const input: InputCreateAuthenticateDto = ctx.request
    .body as InputCreateAuthenticateDto;
  try {
    const userRepository = new UserRepository();
    const authenticateUseCase = new AuthenticateUseCase(userRepository);
    const authenticateUser = await authenticateUseCase.execute(input);

    ctx.body = {
      user: authenticateUser.user,
      token: authenticateUser.token,
    };
    ctx.status = 200;
  } catch (error: any) {
    ctx.body = {
      message: 'Error authenticate',
      error: error.message,
    };
    ctx.status = 500;
  }
});
