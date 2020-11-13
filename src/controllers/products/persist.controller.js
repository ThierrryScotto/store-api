"use strict"

// request
const { requestHandler } = require('../../helpers/request.helpers');

// model
const productModel = require('../../models/product.model');

const createProduct = async (req, res) => {
  let { product, amount} = req.body;
  
  try{
    const imageQRcode = await requestHandler(product, res);

    const createdProduct = await productModel.create(product);
  
    res.status(201).send(createdProduct);
    
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "internal error" })
  }
};

module.exports = {
  createProduct
};

// criar uma api que retorno o qr code se
// salvar qr code na database
// validações contra sql injection