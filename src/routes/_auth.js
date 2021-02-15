'use strict';

// dependencies
const express = require('./index');

//controllers
const authRetriveController = require("../controllers/auth/retrive.controller");

express.router.post('/authenticate', authRetriveController.check);

module.exports = express.router;
