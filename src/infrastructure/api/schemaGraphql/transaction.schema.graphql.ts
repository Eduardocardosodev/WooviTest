import { Field, ID, ObjectType } from 'type-graphql';
import { TransactionSchemaGraphql } from '../../transaction/repository/mongoose/transaction.model';

@ObjectType()
export class TransactionSchema implements TransactionSchemaGraphql {
  @Field((type) => ID, { nullable: true })
  id: any;

  @Field({ nullable: true })
  sender: string;

  @Field({ nullable: true })
  receiver: string;

  @Field({ nullable: false })
  value: number;
}
