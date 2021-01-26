'use strict'

// model
const clientModel = require('../../models/clients.model');

const getClients = async (req, res) => {
  const clientFound = await clientModel.find();

  if (clientFound.length <= 0) {
    return res.status(404).send({ message: 'Clients not found' });
  }

  res.status(200).send(clientFound);
};

const getClientstById = async (req, res) => {
  const { clientId } = req.params;

  const clientFound = await clientModel.findById({ _id: clientId });

  if (!clientFound) {
    return res.status(404).send({ message: `Client ${clientId} not found` })
  }

  res.status(200).send(clientFound);
};

module.exports = {
  getClients,
  getClientstById
}