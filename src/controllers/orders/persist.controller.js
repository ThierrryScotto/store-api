'use strict'

// dependencies 
const { validate } = require('../../helpers/validate.helpers');

// model
const ordersModel  = require('../../models/order.model');
const clientModel  = require('../../models/clients.model');
const productModel = require('../../models/product.model');

// private
const _validateRegisterBody = (body) => {
  const registerSchema = {
    'id'  : '/RegisterProduct',
    'type': 'object',
    'properties'  : {
      'clientId'  : { 'type': 'string' },
      'productId' : { 'type': 'string' },
      'amount'    : { 'type': 'number' },
      'total'     : { 'type': 'number' },
      'status'    : { 'type': 'number' }
    },
    'required': ['clientId', 'productId', 'amount', 'total', 'status']
  };
  return validate(registerSchema, body);
};

const _validateEditBody = (body) => {
  const reditSchema = {
    'id'  : '/RegisterProduct',
    'type': 'object',
    'properties'  : {
      'amount'    : { 'type': 'number' },
      'total'     : { 'type': 'number' },
      'status'    : { 'type': 'number' }
    },
    'required': ['clientId', 'productId', 'amount', 'total', 'status']
  };
  return validate(reditSchema, body);
};

const createOrders = async (req, res) => {
  const postBody = _validateRegisterBody(req.body);

  try{

    const clientFound  = await clientModel.findById({ _id: postBody.clientId });

    if (clientFound) {
      return res.status(404).send({ message: `Client ${postBody.clientId} not found` });
    }
    
    const productFound = await productModel.findById({ _id: postBody.productId });
    
    if (productFound) {
      return res.status(404).send({ message: `Product ${postBody.clientId} not found` });
    }

    const createOrder = await ordersModel.create(postBody);
  
    return res.status(201).send(createOrder);
    
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "internal error" })
  }
};

const editOrders = async (req, res) => {
  const { orderId } = req.params;
  const body          = _validateEditBody(req.body);
  try {
    const orderFound = await ordersModel.findById({ _id: orderId });
    
    if (!orderFound) {
      return res.status(404).send({ message: `OrderFound ${orderId} not found` });
    }
    
    orderFound.clientId   = body.clientId   || orderFound.clientId;
    orderFound.productId  = body.productId  || orderFound.productId;
    orderFound.amount     = body.amount     || orderFound.amount;
    orderFound.total      = body.total      || orderFound.total;
    orderFound.status     = body.status     || orderFound.status;
    orderFound.updatedAt  = new Date();
      
    orderFound.overwrite({ 
      clientId  : orderFound.name,
      productId : orderFound.category,
      amount    : orderFound.price, 
      total     : orderFound.sizes, 
      status    : orderFound.colors, 
      updatedAt : orderFound.amount, 
    });

    await orderFound.save();

    return res.status(200).send(orderFound);

  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "internal error" })
  }
};

const deleteOrders = async (req, res) => {
  const { orderId } = req.params;

  try {
    const orderFound = await ordersModel.findById({ _id: orderId }).where('status').equals('1');

    if (!orderFound) {
      return res.status(404).send({ message: `Order ${orderId} not found` })
    }

    await ordersModel.updateOne({ _id: orderId }, { status: 0 });

    return res.status(200).send({ message: `Order ${orderId} deleted` });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "internal error" })
  }
}

module.exports = {
  createOrders,
  editOrders,
  deleteOrders
};