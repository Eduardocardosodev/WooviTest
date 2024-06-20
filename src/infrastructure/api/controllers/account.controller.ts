import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import FindAccountUseCase from '../../../usecase/account/find/find.account.usecase';
import AccountRepository from '../../account/repository/mongoose/account.repository';
import ListAccountUseCase from '../../../usecase/account/list/list.account.usecase';
import CreateAccountUseCase from '../../../usecase/account/create/create.account.usecase';
import User from '../../../domain/user/entity/user';
const accountRepository = new AccountRepository();
const findAccountUseCase = new FindAccountUseCase(accountRepository);
const listAccountUseCase = new ListAccountUseCase(accountRepository);
const createAccountUseCase = new CreateAccountUseCase(accountRepository);
import { InputType, Field } from 'type-graphql';
import { AccountSchema } from '../schemaGraphql/account.schema.graphql';
import { Length } from 'class-validator';

@InputType()
class UserInput {
  @Field()
  @Length(1, 50)
  name: string;

  @Field()
  @Length(1, 50)
  tax_id: string;

  @Field()
  @Length(4, 20)
  password: string;
}

@Resolver(AccountSchema)
export class AccountController {
  @Query((returns) => [AccountSchema], { name: 'accounts' })
  @Authorized()
  async list() {
    const accounts = await listAccountUseCase.execute();
    return accounts;
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
}
