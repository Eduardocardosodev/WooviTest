import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  accountname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
});

module.exports = mongoose.model('Account', accountSchema);
