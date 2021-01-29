'use strict'

// dependencies
require('dotenv').config();

const { verifyToken } = require('../services/jwt/index');

module.exports = (req, res, next) => {
  if (process.env.NODE_ENVIRONMENT === 'local') {
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'You need an access token' });
  }

  if (!verifyToken(authHeader)) {
    return res.status(401).send({ error: 'Invalid token' })
  }  

  return next();
}