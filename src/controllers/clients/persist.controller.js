'use strict'

// dependencies 
const { validate } = require('../../helpers/validate.helpers');

// model
const clientModel = require('../../models/clients.model');

// private
const _validateRegisterBody = (body) => {
  const registerSchema = {
    'id'  : '/RegisterProduct',
    'type': 'object',
    'properties'    : {
      'name'        : { 'type': 'string' },
      'lastName'    : { 'type': 'string' },
      'document'    : { 'type': 'string' },
      'gender'      : { 'type': 'string' },
      'phoneNumber' : { 'type': 'string' },
      'dateOfBirth' : { 'type': 'object' }
    },
    'required': ['name', 'lastName', 'document', 'gender', 'phoneNumber']
  };
  return validate(registerSchema, body);
};

const _validateEditBody = (body) => {
  const reditSchema = {
    'id'  : '/RegisterProduct',
    'type': 'object',
    'properties'    : {
      'phoneNumber' : { 'type': 'string' },
    },
    'required': ['phoneNumber']
  };
  return validate(reditSchema, body);
};

const createClients = async (req, res) => {  
  const postBody = _validateRegisterBody(req.body);

  try{
    const createdClient = await clientModel.create(postBody);
  
    return res.status(201).send(createdClient);
    
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "internal error" })
  }
};

const editClients = async (req, res) => {
  const { clientId } = req.params;
  const body          = _validateEditBody(req.body);
  try {
    const clientFound = await clientModel.findById({ _id: clientId });
    
    if (!clientFound) {
      return res.status(404).send({ message: `Client ${clientId} not found` });
    }
    
    clientFound.name        = body.name        || clientFound.name;
    clientFound.lastName    = body.lastName    || clientFound.lastName;
    clientFound.document    = body.document    || clientFound.document;
    clientFound.gender      = body.gender      || clientFound.gender;
    clientFound.phoneNumber = body.phoneNumber || clientFound.phoneNumber;
    clientFound.dateOfBirth = body.dateOfBirth || clientFound.dateOfBirth;
    clientFound.updatedAt   = new Date();
      
    clientFound.overwrite({ 
      name        : clientFound.name,
      lastName    : clientFound.lastName,
      document    : clientFound.document, 
      gender      : clientFound.gender, 
      phoneNumber : clientFound.phoneNumber, 
      dateOfBirth : clientFound.dateOfBirth, 
      updatedAt   : clientFound.updatedAt
    });

    await clientFound.save();

    return res.status(200).send(clientFound);

  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "internal error" })
  }
};

module.exports = {
  createClients,
  editClients
};