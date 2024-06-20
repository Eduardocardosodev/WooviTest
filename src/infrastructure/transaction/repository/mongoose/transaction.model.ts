import mongoose from 'mongoose';
import { Schema } from 'mongoose';

export interface TransactionSchemaGraphql {
  id?: any;
  sender: string;
  receiver: string;
  value: number;
}

export const transactionSchema = new Schema({
  sender: { type: Schema.Types.String, required: true },
  receiver: { type: Schema.Types.String, required: true },
  value: { type: mongoose.Types.Decimal128, required: true },
  date: { type: Date, default: Date.now },
});

export const TransactionModel = mongoose.model(
  'Transaction',
  transactionSchema
);
