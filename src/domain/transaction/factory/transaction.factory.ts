import { v4 as uuid } from 'uuid';
import Transaction from '../entity/transaction';

export default class TransactionFactory {
  public static create(
    sender: string,
    receiver: string,
    value: number
  ): Transaction {
    return new Transaction(uuid(), sender, receiver, value);
  }
}
