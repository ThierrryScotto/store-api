"use strict"

// dependencies
require('dotenv').config();
const RequestClient = require("reqclient").RequestClient;

// constant
const request  = new RequestClient(process.env.QR_CODE_API_URL);
const basePath = process.env.QR_CODE_API;

const requestHandler = async(body, res) => {
  try {
    let imageQRcode = await request.post('generate/qrcode', body);
    
    return imageQRcode;
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error" });
  }
};

module.exports = { 
  requestHandler 
};