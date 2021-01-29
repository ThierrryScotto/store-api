'use strict'

// dependencies
require('dotenv').config();
const chai     = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// server
const app = require('../src/index.js');

// constant
const basePath = '/v1/products';

// variables
let body;

const { product } = require('./populate/product.populate');

describe('2.1 Test Case create a Products through endpoint products', () => {
  it('Should create and return new Product', (done) => {
    chai.request(app)
      .post(basePath)
      .send(product.body)
      .then(res => {
        
        chai.expect(res.statusCode).eq(201);
        product.body = res.body;

        chai.expect(product.body).to.be.an('object', 'Your body is not an object!');

        done();
      })
      .catch(err => {
        return done(err);
      })
  });

  it('Should retrive a error because the Product object is invalid', (done) => {
    chai.request(app)
      .post(basePath)
      .send(product.error)
      .then(res => {
        
        chai.expect(res.statusCode).eq(500);

        done();
      })
      .catch(err => {
        return done(err);
      })
  });
});

describe('2.2 Test Case edit a Products through endpoint products/:productId', () => {
  it('Should edit and return Product', (done) => {
    chai.request(app)
      .put(`${basePath}/${product.body._id}`)
      .send(product.edit)
      .then(res => {
        
        chai.expect(res.statusCode).eq(200);
        chai.expect(res.body).to.be.an('object', 'Your body is not an object!');

        done();
      })
      .catch(err => {
        return done(err);
      })
  });
});

describe('2.3 Test Case Get all Products through endpoint products', () => {
  it('Should retrive All the products registered', (done) => {
    chai.request(app)
      .get(basePath)
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

describe('2.4 Test Case Get Products by id through endpoint products/:productId', () => {
  it('Should retrive Product by id', (done) => {
    chai.request(app)
      .get(`${basePath}/${product.body._id}`)
      .then(res => {

        chai.expect(res.statusCode).eq(200);
        chai.expect(res.body).to.be.an('object', 'Your body is not an object!');

        done();
      })
      .catch(err => {
        return done(err);
      })
  });

  it('Should retrive a error because the id is invalid', (done) => {
    chai.request(app)
      .get(`${basePath}/${product.notFound._id}`)
      .then(res => {
        
        chai.expect(res.statusCode).eq(404);

        done();
      })
      .catch(err => {
        return done(err);
      })
  });
});

describe('2.5 Test Case delete a Products through endpoint products/:productId', () => {
  it('Should delete and return a notification', (done) => {
    chai.request(app)
      .delete(`${basePath}/${product.body._id}`)
      .send(body)
      .then(res => {
        
        chai.expect(res.statusCode).eq(200);
        chai.expect(res.body).to.be.an('object', 'Your body is not an object!');

        done();
      })
      .catch(err => {
        return done(err);
      })
  });
});