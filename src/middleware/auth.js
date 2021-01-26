'use strict'

const { verifyToken } = require('../services/jwt/index');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'You need an access token' });
  }

  if (!verifyToken(authHeader)) {
    return res.status(401).send({ error: 'Invalid token' })
  }  

  next();
}