import { Field, ID, ObjectType } from 'type-graphql';
import { UserSchemaGraphql } from '../../user/repository/mongoose/user.model';

@ObjectType()
export class UserSchema implements UserSchemaGraphql {
  @Field((type) => ID, { nullable: true })
  id: string;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  tax_id: string;

  @Field(() => String, { nullable: false })
  password: string;
}
