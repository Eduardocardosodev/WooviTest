import Router from 'koa-router';

export const accountRoute = new Router();

// accountRoute.post('/accounts', async (ctx) => {
//     const { name } = ctx.request.body;
//     if (!name) {
//       ctx.status = 400;
//       ctx.body = { error: 'Name is required' };
//       return;
//     }

//     const newAccount = new Account({ name });
//     await newAccount.save();
//     ctx.body = newAccount;
//   });

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
