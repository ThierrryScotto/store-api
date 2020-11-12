"use strict"

// model
const productModel = require('../../models/product.model');

const createProduct = async (req, res) => {
  let { product, amount} = req.body;

  const createdProduct = await productModel.create(product);
};

module.exports = {
  createProduct
};