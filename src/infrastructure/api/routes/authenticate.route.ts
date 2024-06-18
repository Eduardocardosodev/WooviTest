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
    console.log('ÇHEGUEI AQUI');
    const authenticateUser = await authenticateUseCase.execute(input);

    console.log('usuario atuhetnticado ====', authenticateUser.user);

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
