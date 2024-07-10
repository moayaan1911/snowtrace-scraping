/** @format */

import mongoose from 'mongoose';

const gasSchema = new mongoose.Schema({
  nAVAX: { type: Number, required: true },
  usd: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const GasPrice = mongoose.model('GasPrice', gasSchema);

export default GasPrice;
