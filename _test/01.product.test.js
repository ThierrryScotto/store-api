'use strict'

// dependencies
require('dotenv').config();
const chai     = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// server
require('../src/index.js');

// constant
const basePath = process.env.BASEPATH;

describe('01 Test', () => {
  it('Should function', (done) => {
    chai.request(basePath)
      .get('/products/test')
      .then(res => {
        chai.expect(res.statusCode).eq(200);
        done();
      })
      .catch(err => {
        return done(err);
      })
  });
});