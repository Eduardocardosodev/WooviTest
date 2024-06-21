import { Field, ID, ObjectType } from 'type-graphql';
import { TransactionSchemaGraphql } from '../../transaction/repository/mongoose/transaction.model';

@ObjectType()
export class TransactionSchema implements TransactionSchemaGraphql {
  @Field((type) => ID, { nullable: true })
  id: any;

  @Field(() => String, { nullable: true })
  sender: string;

  @Field(() => String, { nullable: true })
  receiver: string;

  @Field(() => Number, { nullable: false })
  value: number;
}
