'use strict'

// dependencies
const express = require('./index');

//controllers
const productPersistController = require("../controllers/products/persist.controller");
const productRetriveController = require("../controllers/products/retrive.controller");

express.router.get('/products/:productId', productRetriveController.getProductById);
express.router.get('/products', productRetriveController.getProducts);
express.router.post('/products', productPersistController.createProduct);

module.exports = express.router;