'use strict'

// dependencies
const mongoose = require('../services/db/index');

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  clientId:    { type: mongoose.ObjectId, required: true },
  postalCode:  { type: Number, required: true },
  address:     { type: String, required: true },
  houseNumber: { type: Number, required: true },
  complement:  { type: String, required: true },
  recipient:   { type: String, required: true },
  status:      { type: Number, default: 1 },
  updatedAt:   { type: Date },
  createdAt:   { type: Date, default: Date.now },
});

module.exports = mongoose.model('address', addressSchema);