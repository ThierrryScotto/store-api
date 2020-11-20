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

const _validateEditBody = (body) => {
  const registerSchema = {
    'id'  : '/RegisterProduct',
    'type': 'object',
    'properties': {
      'mark'   : { 'type': 'string' },
      'size'   : { 'type': 'string' },
      'color'  : { 'type': 'string' },
      'price'  : { 'type': 'number' },
      'status'  : { 'type': 'number' },
    },
    'required': ['mark', 'size', 'color', 'price', 'status']
  };
  return validate(registerSchema, body);
};

const createProduct = async (req, res) => {  
  const postBody = _validateRegisterBody(req.body);

  try{
    const createdProduct = await productModel.create(postBody);
  
    return res.status(201).send(createdProduct);
    
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "internal error" })
  }
};

const editProduct = async (req, res) => {
  const { productId } = req.params;
  const body          = _validateEditBody(req.body);
  try {
    const product = await productModel.findById({ _id: productId });
    
    if (!product) {
      res.status(404).send({ message: `Product ${productId} not found` });
    }
    
    product.mark   = body.mark   || product.mark;
    product.size   = body.size   || product.size;
    product.color  = body.color  || product.color;
    product.price  = body.price  || product.price;
    product.status = body.status || product.status;
      
    product.overwrite({ 
      mark  : product.mark, 
      size  : product.size, 
      color : product.color, 
      price : product.price,
      status: product.status });

    await product.save();

    return res.status(200).send(product);

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "internal error" })
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await productModel.updateOne({ _id: productId }, { status: 1 });

    if (!product.nModified >= 1) {
      res.status(404).send({ message: `Product ${productId} not found` });
    }

    return res.status(200).send({ message: `Product ${productId} deleted` });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "internal error" })
  }
}

module.exports = {
  deleteProduct,
  createProduct,
  editProduct
};