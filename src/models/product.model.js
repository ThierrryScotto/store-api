'use strict'

// dependencies
const mongoose = require('../services/db/index');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  // photo:        { type: String, required: true }, //pegar de uma s3 e mandar o link da imagem do s3 para o front
  name:         { type: String, required: true },
  category:     { type: String, required: true },
  price:        { type: Number, required: true },
  sizes:        { type: [Number], required: true },
  colors:       { type: [String], required: true },
  amount:       { type: Number, required: true },
  gender:       { type: String, required: true },
  description:  { type: String, required: true },
  status:       { type: Number, required: true, default: 1 },   // 0 deleted | 1 available 
  createdAt:    { type: Date, default: Date.now }
});

module.exports = mongoose.model('products', productSchema);