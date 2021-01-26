'use strict'

// model
const orderModel = require('../../models/order.model');

const getOrders = async (req, res) => {
  const ordersFound = await orderModel.find({ status: 1 });

  if (ordersFound.length <= 0) {
    return res.status(404).send({ message: 'Orders not found' }).where('status').equals('1');
  }

  res.status(200).send(ordersFound);
};

const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  const orderFound = await orderModel.findById({ _id: orderId }).where('status').equals('1');

  if (!orderFound) {
    return res.status(404).send({ message: `OrderFound ${orderId} not found` })
  }

  res.status(200).send(orderFound);
};

module.exports = {
  getOrders,
  getOrderById
}