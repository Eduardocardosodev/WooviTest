import Router from 'koa-router';
import AccountRepository from '../../account/repository/mongoose/account.repository';
import CreateAccountUseCase from '../../../usecase/account/create/create.account.usecase';
import { InputCreateAccountDto } from '../../../usecase/account/create/create.account.dto';
import { v4 as uuid } from 'uuid';

export const accountRoute = new Router();

accountRoute.post('/', async (ctx, next) => {
  const accountRepository = new AccountRepository();
  const createaccountUseCase = new CreateAccountUseCase(accountRepository);

  const input: InputCreateAccountDto = ctx.request
    .body as InputCreateAccountDto;

  try {
    const output = await createaccountUseCase.execute({
      account_number: uuid(),
      user_id: '1234',
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

//   accountRoute.get('/', async (ctx, next) => {
// //   const usecase = new ListCustomerUseCase(new CustomerRepository());
// //   const output = await usecase.execute({});
// const id = parseInt(ctx.params.id);

//   ctx.response.('hello')

// //   res.format({
// //     json: async () => res.send(output),
// //     xml: async () => res.send(CustomerPresenter.toXML(output)),
// //   });
// });
