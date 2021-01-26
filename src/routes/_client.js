'use strict'

// dependencies
const express = require('./index');

//controllers
const clientPersistController = require("../controllers/clients/persist.controller");
const clientRetriveController = require("../controllers/clients/retrive.controller");

// middleware
const authMiddleware = require("../middleware/auth");

express.router.post('/products', clientPersistController.createClients);
express.router.put('/products/:productId', authMiddleware, clientPersistController.editClients);
express.router.get('/products/:productId', authMiddleware, clientRetriveController.getClientstById);
express.router.get('/products', authMiddlewarem, clientRetriveController.getClients);

module.exports = express.router;