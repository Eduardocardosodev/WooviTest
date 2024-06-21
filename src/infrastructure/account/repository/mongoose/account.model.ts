import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface AccountSchemaGraphql {
  id?: any;
  account_number: string;
  user_id: string;
  balance: number;
}

interface IAccount extends Document {
  _id: string;
  account_number: string;
  user_id: string;
  balance: mongoose.Types.Decimal128;
  date: Date;
}

const accountSchema: Schema = new Schema({
  _id: { type: String, default: uuidv4 },
  account_number: {
    type: String,
    required: true,
    default: uuidv4,
    unique: true,
  },
  user_id: { type: String, required: true },
  balance: { type: mongoose.Types.Decimal128, required: true },
  date: { type: Date, default: Date.now },
});

export const AccountModel = mongoose.model<IAccount>('Account', accountSchema);
