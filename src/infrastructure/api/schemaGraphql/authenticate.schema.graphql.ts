import { Field, ObjectType } from 'type-graphql';
import { AccountSchema } from './account.schema.graphql';

interface IAuth {
  token: string;
  account: AccountSchema;
}

@ObjectType()
class AuthSchema implements IAuth {
  @Field(() => String, { nullable: false })
  token: string;

  @Field((type) => AccountSchema, { nullable: true })
  account: AccountSchema;
}

export default AuthSchema;
