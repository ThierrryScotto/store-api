"use strict"

// dependecies
const router = require('./routes/index');

// routes
const client   = require('./routes/_client');
const products = require('./routes/_products');

// constant
const basePath = '/v1';

router.express.use(`${basePath}`,  client);
router.express.use(`${basePath}`,  products);