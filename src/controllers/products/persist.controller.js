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
    'properties'    : {
      'name'        : { 'type': 'string' },
      'category'    : { 'type': 'string' },
      'price'       : { 'type': 'number' },
      'sizes'       : { 'type': 'array' },
      'colors'      : { 'type': 'array' },
      'amount'      : { 'type': 'number' },
      'gender'      : { 'type': 'string' },
      'description' : { 'type': 'string' },
      'status'      : { 'type': 'number' }
    },
    'required': ['name', 'category', 'price', 'sizes', 'colors', 'amount', 'gender', 'description', 'status']
  };
  return validate(registerSchema, body);
};

const _validateEditBody = (body) => {
  const reditSchema = {
    'id'  : '/RegisterProduct',
    'type': 'object',
    'properties': {
      'name'        : { 'type': 'string' },
      'category'    : { 'type': 'string' },
      'price'       : { 'type': 'number' },
      'sizes'       : { 'type': 'array' },
      'colors'      : { 'type': 'array' },
      'amount'      : { 'type': 'number' },
      'gender'      : { 'type': 'string' },
      'description' : { 'type': 'string' },
      'status'      : { 'type': 'number' }
    },
    'required': ['name', 'category', 'price', 'sizes', 'colors', 'amount', 'gender', 'description', 'status']
  };
  return validate(reditSchema, body);
};

const createProduct = async (req, res) => {  
  const postBody = _validateRegisterBody(req.body, res);

  try{
    const createdProduct = await productModel.create(postBody);
  
    return res.status(201).send(createdProduct);
    
  } catch (error) {
    res.status(500).send({ message: "internal error" })
  }
};

const editProducts = async (req, res) => {
  const { productId } = req.params;
  const body          = _validateEditBody(req.body);
  try {
    const product = await productModel.findById({ _id: productId });
    
    if (!product) {
      return res.status(404).send({ message: `Product ${productId} not found` });
    }
    
    product.name        = body.name        || product.name;
    product.category    = body.category    || product.category;
    product.price       = body.price       || product.price;
    product.sizes       = body.sizes       || product.sizes;
    product.colors      = body.colors      || product.colors;
    product.amount      = body.amount      || product.amount;
    product.gender      = body.gender      || product.gender;
    product.description = body.description || product.description;
    product.status      = body.status      || product.status;
      
    product.overwrite({ 
      name        : product.name,
      category    : product.category,
      price       : product.price, 
      sizes       : product.sizes, 
      colors      : product.colors, 
      amount      : product.amount, 
      gender      : product.gender, 
      description : product.description,
      status      : product.status 
    });

    await product.save();

    return res.status(200).send(product);

  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "internal error" })
  }
};

const deleteProducts = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await productModel.findById({ _id: productId }).where('status').equals('1');

    if (!product) {
      return res.status(404).send({ message: `Product ${productId} not found` })
    }

    await productModel.updateOne({ _id: productId }, { status: 0 });

    return res.status(200).send({ message: `Product ${productId} deleted` });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "internal error" })
  }
}

module.exports = {
  editProducts,
  createProduct,
  deleteProducts
};