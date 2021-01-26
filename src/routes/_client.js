'use strict'

// dependencies
const express = require('./index');

//controllers
const clientPersistController = require("../controllers/clients/persist.controller");
const clientRetriveController = require("../controllers/clients/retrive.controller");

// middleware
const authMiddleware = require("../middleware/auth");

express.router.post('/clients', clientPersistController.createClients);
express.router.put('/clients/:clientId', authMiddleware, clientPersistController.editClients);
express.router.get('/clients/:clientId', authMiddleware, clientRetriveController.getClientstById);
express.router.get('/clients', authMiddleware, clientRetriveController.getClients);

module.exports = express.router;