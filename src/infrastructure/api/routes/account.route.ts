import Router from 'koa-router';
import AccountRepository from '../../account/repository/mongoose/account.repository';
import CreateAccountUseCase from '../../../usecase/account/create/create.account.usecase';
import { InputCreateAccountDto } from '../../../usecase/account/create/create.account.dto';
import { v4 as uuid } from 'uuid';
import { authMiddleware } from '../middlewares/auth';
import FindAccountUseCase from '../../../usecase/account/find/find.account.usecase';

export const accountRoute = new Router();

accountRoute.post('/', async (ctx, next) => {
  const accountRepository = new AccountRepository();
  const createaccountUseCase = new CreateAccountUseCase(accountRepository);

  const input: InputCreateAccountDto = ctx.request
    .body as InputCreateAccountDto;

  try {
    const output = await createaccountUseCase.execute({
      balance: input.balance,
      user: {
        name: input.user.name,
        tax_id: input.user.tax_id,
        password: input.user.password,
      },
    });
    ctx.body = {
      message: 'Account created successfully',
      data: output,
    };
    ctx.status = 201;
  } catch (error: any) {
    ctx.body = {
      message: 'Error creating account',
      error: error.message,
    };
    ctx.status = 400;
  }
});

accountRoute.get('/:id', authMiddleware, async (ctx, next) => {
  const accountRepository = new AccountRepository();
  const findAccountUseCase = new FindAccountUseCase(accountRepository);

  const { id } = ctx.params;

  try {
    const output = await findAccountUseCase.execute(id);
    ctx.body = {
      message: 'Account find successfully',
      data: output,
    };
    ctx.status = 200;
  } catch (error: any) {
    ctx.body = {
      message: 'Error finding account',
      error: error.message,
    };
    console.log(console.log(error));
    ctx.status = 400;
  }
});
