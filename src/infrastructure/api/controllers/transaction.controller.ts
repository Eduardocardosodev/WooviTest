import {
  Arg,
  Authorized,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { TransactionSchema } from '../schemaGraphql/transaction.schema.graphql';
import TransactionRepository from '../../transaction/repository/mongoose/transaction.repository';
import FindTransactionUseCase from '../../../usecase/transactions/find/find.transaction.usecase';
import ListTransactionUseCase from '../../../usecase/transactions/list/list.transaction.usecase';
import CreateTransactionUseCase from '../../../usecase/transactions/create/create.transaction.usecase';
import AccountRepository from '../../account/repository/mongoose/account.repository';
import DeletetransactionUseCase from '../../../usecase/transactions/delete/delete.transaction.usecase';
const transactionRepository = new TransactionRepository();
const accountRepository = new AccountRepository();

const findtransactionUseCase = new FindTransactionUseCase(
  transactionRepository
);
const listTransactionUseCase = new ListTransactionUseCase(
  transactionRepository
);
const createTransactionUseCase = new CreateTransactionUseCase(
  transactionRepository,
  accountRepository
);

const deleteTransactionUseCase = new DeletetransactionUseCase(
  transactionRepository,
  accountRepository
);

@ObjectType()
export class MessageResponse {
  @Field()
  message: string;
}

@Resolver(TransactionSchema)
export class TransactionController {
  @Query((returns) => [TransactionSchema], { name: 'transactions' })
  @Authorized()
  async list() {
    const transactions = await listTransactionUseCase.execute();
    return transactions.map((transactions: any) => ({
      id: transactions.transactions.id,
      sender: transactions.transactions.sender,
      receiver: transactions.transactions.receiver,
      value: transactions.transactions.value,
    }));
  }

  @Query((returns) => TransactionSchema, { name: 'transaction' })
  @Authorized()
  async find(@Arg('id') id: string) {
    const transaction = await findtransactionUseCase.execute({ id });
    return transaction;
  }

  @Mutation((returns) => TransactionSchema, { name: 'createTransaction' })
  @Authorized()
  async create(
    @Arg('sender') sender: string,
    @Arg('receiver') receiver: string,
    @Arg('value') value: number
  ) {
    const input = {
      sender,
      receiver,
      value,
    };

    const account = await createTransactionUseCase.execute(input);
    return account;
  }

  @Mutation((returns) => MessageResponse, { name: 'deleteTransaction' })
  @Authorized()
  async delete(@Arg('id') id: string): Promise<MessageResponse> {
    const input = {
      id,
    };

    await deleteTransactionUseCase.execute(input);
    return { message: 'Account successfully deleted' };
  }
}
