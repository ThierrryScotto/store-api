'use strict'

// dependencies 
const { validate } = require('../../helpers/validate.helpers');

// model
const clientModel  = require('../../models/client.model');
const addressModel = require('../../models/address.model');

// private
const _validateRegisterBody = (body) => {
  const registerSchema = {
    'id'  : '/RegisterProduct',
    'type': 'object',
    'properties'    : {
      'clientId'    : { 'type': 'string' },
      'postalCode'  : { 'type': 'number' },
      'address'     : { 'type': 'string' },
      'houseNumber' : { 'type': 'number' },
      'complement'  : { 'type': 'string' },
      'recipient'   : { 'type': 'string' }
    },
    'required': ['clientId', 'postalCode', 'address', 'houseNumber', 'complement', 'recipient']
  };
  return validate(registerSchema, body);
};

const _validateEditBody = (body) => {
  const reditSchema = {
    'id'  : '/RegisterProduct',
    'type': 'object',
    'properties'    : {
      'clientId'    : { 'type': 'string' },
      'postalCode'  : { 'type': 'number' },
      'address'     : { 'type': 'string' },
      'houseNumber' : { 'type': 'number' },
      'complement'  : { 'type': 'string' },
      'recipient'   : { 'type': 'string' }
    },
    'required': ['clientId', 'postalCode', 'address', 'houseNumber', 'complement', 'recipient']
  };
  return validate(reditSchema, body);
};

const createAddress = async (req, res) => {  
  const postBody = _validateRegisterBody(req.body);

  try{
    const clientFound = await clientModel.findById({ _id: postBody.clientId });

    if (!clientFound) {
      return res.status(404).send({ message: `Client ${postBody.clientId} not found` });
    }
    const adddressCreated = await addressModel.create(postBody);
  
    return res.status(201).send(adddressCreated);    
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "internal error" })
  }
};

const editAddress = async (req, res) => {
  const { addressId } = req.params;
  const body         = _validateEditBody(req.body);
  try {
    const clientFound = await clientModel.findById({ _id: body.clientId });
    
    if (!clientFound) {
      return res.status(404).send({ message: `Client ${body.clientId} not found` });
    }

    const addressFound = await addressModel.findById({ _id: addressId });
    
    if (!addressFound) {
      return res.status(404).send({ message: `Address ${addressId} not found` });
    }
    

    addressFound.clientId    = body.clientId    || addressFound.clientId;
    addressFound.postalCode  = body.postalCode  || addressFound.postalCode;
    addressFound.address     = body.address     || addressFound.address;
    addressFound.houseNumber = body.houseNumber || addressFound.houseNumber;
    addressFound.complement  = body.complement  || addressFound.complement;
    addressFound.recipient   = body.recipient   || addressFound.recipient;
    addressFound.status      = body.status;
    addressFound.updatedAt   = new Date();
    
    addressFound.overwrite({ 
      clientId    : addressFound.clientId,
      postalCode  : addressFound.postalCode,
      address     : addressFound.address,
      houseNumber : addressFound.houseNumber,
      complement  : addressFound.complement, 
      recipient   : addressFound.recipient, 
      status      : addressFound.status, 
      updatedAt   : addressFound.updatedAt
    });

    await addressFound.save();

    return res.status(200).send(addressFound);

  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "internal error" })
  }
};

const deleteAddress = async (req, res) => {
  const { addressId } = req.params;

  try {
    const addresFound = await addressModel.findById({ _id: addressId }).where('status').equals(1);

    if (!addresFound) {
      return res.status(404).send({ message: `Address ${addressId} not found` })
    }

    await addressModel.updateOne({ _id: addressId }, { status: 0 });

    return res.status(200).send({ message: `Address ${addressId} deleted` });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "internal error" })
  }
}

module.exports = {
  createAddress,
  deleteAddress,
  editAddress
};