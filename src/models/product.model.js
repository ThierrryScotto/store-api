'use strict'

// dependencies
const mongoose = require('../services/db/index');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  mark:      { type: String, required: true },
  size:      { type: String, required: true },
  color:     { type: String, required: true },
  price:     { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('products', productSchema);