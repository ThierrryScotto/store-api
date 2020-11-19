'use strict'

// model
const productModel = require('../../models/product.model');

const getProducts = async (req, res) => {
  const products = await productModel.find();

  if (products.length <= 0) {
    res.status(404).send({ message: 'Products not found' })
  }

  res.status(200).send(products);
};

const getProductById = async (req, res) => {
  const { productId } = req.params;

  const product = await productModel.findById({ _id: productId });

  if (!product) {
    res.status(404).send({ message: `Product ${productId} not found` })
  }

  res.status(200).send(product);
};

module.exports = {
  getProducts,
  getProductById
}