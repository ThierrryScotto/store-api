'use strict'

require('dotenv').config();

const jwt = require('jsonwebtoken');
const decode = require('jsonwebtoken/decode');

module.exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET, {
    expiresIn: 86400,
  })
}

module.exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWTSECRET, (error, decoded) => {
    if (error) return false
    
    return true; 
  })
}