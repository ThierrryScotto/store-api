'use strict'

require('dotenv').config();

const jwt = require('jsonwebtoken');
const decode = require('jsonwebtoken/decode');

module.exports.generateToken = (id) => {
  return jwt.sign({ id }, "GAISENSEI", {
    expiresIn: 86400,
  })
}

module.exports.verifyToken = (token) => {
  return jwt.verify(token, "GAISENSEI", (error, decoded) => {
    if (error) return false
    
    return true; 
  })
}