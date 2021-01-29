'use strict'

// dependecies
const router = require('./routes/index');

// routes
const auth     = require('./routes/_auth');
const client   = require('./routes/_client');
const orders   = require('./routes/_orders');
const address   = require('./routes/_address');
const products = require('./routes/_products');

// constant
const basePath = '/v1';

router.express.use(`${basePath}`,  auth);
router.express.use(`${basePath}`,  client);
router.express.use(`${basePath}`,  orders);
router.express.use(`${basePath}`,  address);
router.express.use(`${basePath}`,  products);

module.exports = router.express;