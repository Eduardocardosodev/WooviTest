import {
  Arg,
  Authorized,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import FindAccountUseCase from '../../../usecase/account/find/find.account.usecase';
import AccountRepository from '../../account/repository/mongoose/account.repository';
import ListAccountUseCase from '../../../usecase/account/list/list.account.usecase';
import CreateAccountUseCase from '../../../usecase/account/create/create.account.usecase';
import DeleteAccountUseCase from '../../../usecase/account/delete/delete.account.usecase';
const accountRepository = new AccountRepository();
const findAccountUseCase = new FindAccountUseCase(accountRepository);
const listAccountUseCase = new ListAccountUseCase(accountRepository);
const createAccountUseCase = new CreateAccountUseCase(accountRepository);
const deleteAccountUseCase = new DeleteAccountUseCase(accountRepository);

import { InputType, Field } from 'type-graphql';
import { AccountSchema } from '../schemaGraphql/account.schema.graphql';
import { Length } from 'class-validator';
import { MessageResponse } from './transaction.controller';

interface OutPutListAccountGraphQLDto {
  account: {
    id: string;
    account_number: string;
    balance: number;
    user_id: string;
    user: {
      id: string;
      name: string;
      tax_id: string;
      password: string;
    };
  };
}
@InputType()
class UserInput {
  @Field(() => String)
  @Length(1, 50)
  name: string;

  @Field(() => String)
  @Length(1, 50)
  tax_id: string;

  @Field(() => String)
  @Length(4, 20)
  password: string;
}

@Resolver(AccountSchema)
export class AccountController {
  @Query((returns) => [AccountSchema], { name: 'accounts' })
  @Authorized()
  async list() {
    const accounts = await listAccountUseCase.execute();
    return accounts.map((account: any) => ({
      id: account.account.id,
      account_number: account.account.account_number,
      user_id: account.account.user_id,
      balance: account.account.balance,
      user: {
        id: account.account.user.id,
        name: account.account.user.name,
        tax_id: account.account.user.tax_id,
        password: account.account.user.password,
      },
    }));
  }

  @Query((returns) => AccountSchema, { name: 'account' })
  @Authorized()
  async find(@Arg('id') id: string) {
    const account = await findAccountUseCase.execute(id);
    return account;
  }

  @Mutation((returns) => AccountSchema, { name: 'createAccount' })
  async create(
    @Arg('balance') balance: number,
    @Arg('user', (type) => UserInput) userInput: UserInput
  ) {
    const input = {
      balance,
      user: {
        name: userInput.name,
        tax_id: userInput.tax_id,
        password: userInput.password,
      },
    };

    const account = await createAccountUseCase.execute(input);
    return account;
  }

  @Mutation((returns) => MessageResponse, { name: 'deleteAccount' })
  async delete(@Arg('id') id: string): Promise<MessageResponse> {
    const input = {
      id,
    };

    await deleteAccountUseCase.execute(input);
    return { message: 'Account successfully deleted' };
  }
}
