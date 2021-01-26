'use strict'

const mongoose         = require('../services/db/index');
const { generateHash } = require('../services/bcrypt/index');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name:        { type: String, required: true },
  password:    { type: String, required: true },
  lastName:    { type: String, required: true },
  document:    { type: String, required: true },
  gender:      { type: String, required: true },
  phoneNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  updatedAt:   { type: String },
  createdAt:   { type: Date, default: Date.now },
});

clientSchema.pre('save', async function (next) {
  const hash = await generateHash(this.password);
  this.password = hash;

  next();
});

module.exports = mongoose.model('client', clientSchema);