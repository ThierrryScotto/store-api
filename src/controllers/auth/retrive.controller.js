'use strict';

const { compare }       = require('../../services/bcrypt/index'); 
const { generateToken } = require('../../services/jwt/index');

const clientModel = require('../../models/client.model');

const check = async (req, res) => {
  const { email, password } = req.body;

  const clientFound = await clientModel.findOne({ email }).select('+password');

  if (!clientFound) {
    return res.status(404).send('Client not found');
  }

  if (!await compare(password, clientFound.password)) {
    return res.status(404).send({ error: 'Invalid password' });
  }

  const token = generateToken(clientFound._id);

  res.send({ clientFound, token });
}

module.exports = {
  check
}