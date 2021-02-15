'use strict'

// dependencies
const express = require('./index');

//controllers
const productPersistController = require("../controllers/products/persist.controller");
const productRetriveController = require("../controllers/products/retrive.controller");

// middleware
const authMiddleware = require("../middleware/auth");

express.router.get('/products/:productId', authMiddleware, productRetriveController.getProductById);
express.router.get('/products', authMiddleware, productRetriveController.getProducts);
express.router.post('/products', authMiddleware, productPersistController.createProduct);
express.router.put('/products/:productId', authMiddleware, productPersistController.editProducts);
express.router.delete('/products/:productId', authMiddleware, productPersistController.deleteProducts);

module.exports = express.router;