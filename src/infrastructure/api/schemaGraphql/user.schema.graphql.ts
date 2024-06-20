import { Field, ID, ObjectType } from 'type-graphql';
import { UserSchemaGraphql } from '../../user/repository/mongoose/user.model';

@ObjectType()
export class UserSchema implements UserSchemaGraphql {
  @Field((type) => ID, { nullable: true })
  id: any;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  tax_id: string;

  @Field({ nullable: false })
  password: string;
}
