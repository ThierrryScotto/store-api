const router = require('./routes/index');

const client  = require('./routes/_client');

const basePath = '/v1';

router.express.use(`${basePath}`,  client);

