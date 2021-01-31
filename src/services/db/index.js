'use strict'

require('dotenv').config();
const mongoose = require('mongoose');

class DBClass {
  constructor() {
    this.mongoose = mongoose;
    this.connection();
  }

  async connection() {
    await this.mongoose.connect('mongodb://localhost:8081/my_database', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
  }
}

module.exports = new DBClass().mongoose;