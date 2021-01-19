'use strict'

// model
const productModel = require('../../models/product.model');

const getProducts = async (req, res) => {
  const products = await productModel.find({ status: 1 });

  if (products.length <= 0) {
    return res.status(404).send({ message: 'Products not found' }).where('status').equals('1');
  }

  res.status(200).send(products);
};

const getProductById = async (req, res) => {
  const { productId } = req.params;

  const product = await productModel.findById({ _id: productId }).where('status').equals('1');

  if (!product) {
    return res.status(404).send({ message: `Product ${productId} not found` })
  }

  res.status(200).send(product);
};

module.exports = {
  getProducts,
  getProductById
}