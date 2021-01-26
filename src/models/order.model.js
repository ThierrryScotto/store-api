'use strict'

// dependencies
const mongoose = require('../services/db/index');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  clientId:  { type: mongoose.ObjectId, required: true },
  productId: { type: mongoose.ObjectId, required: true },
  amount:    { type: Number, required: true },
  total:     { type: Number, required: true },
  status:    { type: Number, required: true },
  updatedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('orders', orderSchema);