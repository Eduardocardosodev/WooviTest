import { Field, ID, ObjectType } from 'type-graphql';
import { AccountSchemaGraphql } from '../../account/repository/mongoose/account.model';
import { UserSchema } from './user.schema.graphql';

@ObjectType()
export class AccountSchema implements AccountSchemaGraphql {
  @Field((type) => ID, { nullable: true })
  id: any;

  @Field(() => String, { nullable: true })
  account_number: string;

  @Field(() => String, { nullable: true })
  user_id: string;

  @Field(() => Number, { nullable: false })
  balance: number;

  @Field((type) => UserSchema, { nullable: false })
  user: UserSchema; // Adicione o campo user
}
