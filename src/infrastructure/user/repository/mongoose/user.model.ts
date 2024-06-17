import mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface IUser extends Document {
  _id: string; // UUID
  name: string;
  tax_id: string;
  password: string;
  active: boolean;
  date: Date;
}

const userSchema: Schema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    tax_id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
  },
  {
    _id: false,
  }
);

userSchema.pre('save', function (next) {
  if (!this._id) {
    this._id = uuidv4();
  }
  next();
});

export const UserModel = mongoose.model<IUser>('User', userSchema);
