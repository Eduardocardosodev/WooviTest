import Router from 'koa-router';
import CreateTransactionUseCase from '../../../usecase/transactions/create/create.transaction.usecase';
import TransactionRepository from '../../transaction/repository/mongoose/transaction.repository';
import { InputCreateTransactionDto } from '../../../usecase/transactions/create/create.transaction.dto';
import FindTransactionUseCase from '../../../usecase/transactions/find/find.transaction.usecase';
import ListTransactionUseCase from '../../../usecase/transactions/list/list.transaction.usecase';
import AccountRepository from '../../account/repository/mongoose/account.repository';
import { authMiddlewareRoutes } from '../middlewares/authRoutes';
import DeletetransactionUseCase from '../../../usecase/transactions/delete/delete.transaction.usecase';

export const transactionRoute = new Router();

transactionRoute.post('/', authMiddlewareRoutes, async (ctx, next) => {
  const transactionRepository = new TransactionRepository();
  const accountRepository = new AccountRepository();
  const createTransactionUseCase = new CreateTransactionUseCase(
    transactionRepository,
    accountRepository
  );

  const input: InputCreateTransactionDto = ctx.request
    .body as InputCreateTransactionDto;

  try {
    const output = await createTransactionUseCase.execute(input);
    ctx.body = {
      message: 'Transaction created successfully',
      data: output,
    };
    ctx.status = 201;
  } catch (error: any) {
    ctx.body = {
      message: 'Error creating transaction',
      error: error.message,
    };
    ctx.status = 400;
  }
});
transactionRoute.get('/:id', authMiddlewareRoutes, async (ctx, next) => {
  const transactionRepository = new TransactionRepository();
  const findTransactionUseCase = new FindTransactionUseCase(
    transactionRepository
  );

  const { id } = ctx.params;

  try {
    const output = await findTransactionUseCase.execute({ id });
    ctx.body = {
      message: 'Transaction find successfully',
      data: output,
    };
    ctx.status = 200;
  } catch (error: any) {
    ctx.body = {
      message: 'Error finding transaction',
      error: error.message,
    };
    console.log(error);
    ctx.status = 400;
  }
});

transactionRoute.get('/', authMiddlewareRoutes, async (ctx, next) => {
  const transactionRepository = new TransactionRepository();
  const listTransactionUseCase = new ListTransactionUseCase(
    transactionRepository
  );

  try {
    const output = await listTransactionUseCase.execute();
    ctx.body = {
      message: 'Transaction list successfully',
      data: output,
    };
    ctx.status = 200;
  } catch (error: any) {
    ctx.body = {
      message: 'Error listing transaction',
      error: error.message,
    };
    console.log(error);
    ctx.status = 400;
  }
});

transactionRoute.delete('/:id', authMiddlewareRoutes, async (ctx, next) => {
  const transactionRepository = new TransactionRepository();
  const accountRepository = new AccountRepository();
  const deletetransactionUseCase = new DeletetransactionUseCase(
    transactionRepository,
    accountRepository
  );

  const { id } = ctx.params;

  try {
    const output = await deletetransactionUseCase.execute({ id });
    ctx.body = {
      message: 'transaction delete successfully',
      data: output,
    };
    ctx.status = 200;
  } catch (error: any) {
    ctx.body = {
      message: 'Error deleteing transaction',
      error: error.message,
    };
    console.log(error);
    ctx.status = 500;
  }
});
