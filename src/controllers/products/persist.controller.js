'use strict'

// dependencies 
const { validate } = require('../../helpers/validate.helpers');

// model
const productModel = require('../../models/product.model');

// private
const _validateRegisterBody = (body) => {
  const registerSchema = {
    'id'  : '/RegisterProduct',
    'type': 'object',
    'properties': {
      'mark'   : { 'type': 'string' },
      'size'   : { 'type': 'string' },
      'color'  : { 'type': 'string' },
      'price'  : { 'type': 'number' },
      'ammount': { 'type': 'number' },
    },
    'required': ['mark', 'size', 'color', 'price', 'ammount']
  };
  return validate(registerSchema, body);
};

const createProduct = async (req, res) => {  
  const postBody = _validateRegisterBody(req.body);

  try{
    const createdProduct = await productModel.create(postBody);
  
    res.status(201).send(createdProduct);
    
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "internal error" })
  }
};

module.exports = {
  createProduct
};

// criar os testes
// Ajustar o autenticador