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

// variables
let body;

const product = {
  mark: 'test 2',
  size: 'M',
  color: 'blue',
  price: 12.90,
  ammount: 12
}

let idError = 3;


describe('01 Test Case create a Products through endpoint products', () => {
  it('Should create and return new Product', (done) => {
    chai.request(basePath)
      .post('/products')
      .send(product)
      .then(res => {
        
        chai.expect(res.statusCode).eq(201);
        body = res.body;
        chai.expect(body).to.be.an('object', 'Your body is not an object!');

        done();
      })
      .catch(err => {
        return done(err);
      })
  });
});

describe('02 Test Case Get all Products through endpoint products', () => {
  it('Should retrive All the products registered', (done) => {
    chai.request(basePath)
      .get('/products')
      .then(res => {
        
        chai.expect(res.statusCode).eq(200);

        chai.expect(res.body).to.be.an('array', 'Your body is not an array!');

        done();
      })
      .catch(err => {
        return done(err);
      })
  });
});

describe('03 Test Case Get all Products through endpoint products/:productId', () => {
  it('Should retrive id the product', (done) => {
    chai.request(basePath)
      .get(`/products/${body._id}`)
      .then(res => {
        
        chai.expect(res.statusCode).eq(200);

        body = res.body;
        chai.expect(body).to.be.an('object', 'Your body is not an object!');

        done();
      })
      .catch(err => {
        return done(err);
      })
  });

  it('Should retrive a error because the id is invalid', (done) => {
    chai.request(basePath)
      .get(`/products/${idError}`)
      .then(res => {
        
        chai.expect(res.statusCode).eq(404);

        done();
      })
      .catch(err => {
        return done(err);
      })
  });
});