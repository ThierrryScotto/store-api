'use strict'

// dependencies
const express = require('./index');

//controllers
const orderPersistController = require("../controllers/orders/persist.controller");
const orderRetriveController = require("../controllers/orders/retrive.controller");

express.router.get('/orders/:orderId', orderRetriveController.getOrderById);
express.router.get('/orders', orderRetriveController.getOrders);
express.router.post('/orders', orderPersistController.createOrders);
express.router.put('/orders/:orderId', orderPersistController.editOrders);
express.router.delete('/orders/:orderId', orderPersistController.deleteOrders);

module.exports = express.router;