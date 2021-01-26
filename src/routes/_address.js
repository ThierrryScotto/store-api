'use strict'

// dependencies
const express = require('./index');

//controllers
const addressPersistController = require("../controllers/address/persist.controller");
const addressRetriveController = require("../controllers/address/retrive.controller");

// middleware
const authMiddleware = require("../middleware/auth");

express.router.post('/address', authMiddleware, addressPersistController.createAddress);
express.router.put('/address/:addressId', authMiddleware, addressPersistController.editAddress);
express.router.delete('/address/:addressId', authMiddleware, addressPersistController.deleteAddress);
express.router.get('/address/:addressId', authMiddleware, addressRetriveController.getAddresstById);
express.router.get('/address', authMiddleware, addressRetriveController.getAddress);

module.exports = express.router;