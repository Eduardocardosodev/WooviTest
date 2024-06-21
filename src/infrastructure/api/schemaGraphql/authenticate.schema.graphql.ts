import { Field, ObjectType } from 'type-graphql';
import { UserSchema } from './user.schema.graphql';

interface IAuth {
  token: string;
  user: UserSchema;
}

@ObjectType()
class AuthSchema implements IAuth {
  @Field(() => String, { nullable: false })
  token: string;

  @Field((type) => UserSchema, { nullable: true })
  user: UserSchema;
}

export default AuthSchema;
