'use strict'

// dependencies
const express = require('./index');

//controllers
const productPersistController = require("../controllers/products/persist.controller");

express.router.post('/products', productPersistController.createProduct);

module.exports = express.router;