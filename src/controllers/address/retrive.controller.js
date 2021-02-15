'use strict'

// model
const addressModel = require('../../models/address.model');

const getAddress = async (req, res) => {
  const addressFound = await addressModel.find({ status: 1 });

  if (addressFound.length <= 0) {
    return res.status(404).send({ message: 'Address not found' });
  }

  res.status(200).send(addressFound);
};

const getAddresstById = async (req, res) => {
  const { addressId } = req.params;

  const addressFound = await addressModel.findById({ _id: addressId }).where('status').equals(1);

  if (!addressFound) {
    return res.status(404).send({ message: `Address ${addressId} not found` })
  }

  res.status(200).send(addressFound);
};

module.exports = {
  getAddress,
  getAddresstById
}