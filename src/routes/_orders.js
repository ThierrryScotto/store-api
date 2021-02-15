'use strict'

// dependencies
const express = require('./index');

//controllers
const orderPersistController = require("../controllers/orders/persist.controller");
const orderRetriveController = require("../controllers/orders/retrive.controller");

// middleware
const authMiddleware = require("../middleware/auth");

express.router.get('/orders/:orderId', authMiddleware, orderRetriveController.getOrderById);
express.router.get('/orders', authMiddleware, orderRetriveController.getOrders);
express.router.post('/orders', authMiddleware, orderPersistController.createOrders);
express.router.put('/orders/:orderId', authMiddleware, orderPersistController.editOrders);
express.router.delete('/orders/:orderId', authMiddleware, orderPersistController.deleteOrders);

module.exports = express.router;