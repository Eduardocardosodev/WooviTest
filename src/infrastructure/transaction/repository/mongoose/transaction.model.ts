import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface TransactionSchemaGraphql {
  id?: any;
  sender: string;
  receiver: string;
  value: number;
}

export const transactionSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  sender: { type: Schema.Types.String, required: true },
  receiver: { type: Schema.Types.String, required: true },
  value: { type: mongoose.Types.Decimal128, required: true },
  date: { type: Date, default: Date.now },
});

export const TransactionModel = mongoose.model(
  'Transaction',
  transactionSchema
);
