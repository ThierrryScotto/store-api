'use strict'

// dependencies
require('dotenv').config();
const chai     = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// server
const app = require('../src/index.js');

// constant
const basePathOrders   = '/v1/orders';

// variables
let body;

// populate
const { client }  = require('./populate/client.populate.js');
const { product } = require('./populate/product.populate');
const { order }   = require('./populate/order.populate.js');

describe('3.1 Test Case create a Order through endpoint Orders', () => {
  it('Should create and return new Order', (done) => {
    
    order.body.clientId  = client.body._id;
    order.body.productId = product.body._id;

    chai.request(app)
      .post(basePathOrders)
      .send(order.body)
      .then(res => {
        
        chai.expect(res.statusCode).eq(201);
        order.body = res.body;

        chai.expect(order.body).to.be.an('object', 'Your body is not an object!');

        done();
      })
      .catch(err => {
        return done(err);
      })
  });

  it('Should retrive a error because the Order object is invalid', (done) => {
    chai.request(app)
      .post(basePathOrders)
      .send(order.error)
      .then(res => {
        
        chai.expect(res.statusCode).eq(500);

        done();
      })
      .catch(err => {
        return done(err);
      })
  });
});

describe('3.2 Test Case edit a Order through endpoint orders/:orderId', () => {
  it('Should edit and return Order', (done) => {
    chai.request(app)
      .put(`${basePathOrders}/${order.body._id}`)
      .send(order.edit)
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

describe('3.3 Test Case Get all Order through endpoint Orders', () => {
  it('Should retrive All the orders registered', (done) => {
    chai.request(app)
      .get(basePathOrders)
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

describe('3.4 Test Case Get Order by id through endpoint orders/:orderId', () => {
  it('Should retrive Order by id', (done) => {
    chai.request(app)
      .get(`${basePathOrders}/${order.body._id}`)
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
      .get(`${basePathOrders}/${order.notFound._id}`)
      .then(res => {
        
        chai.expect(res.statusCode).eq(404);

        done();
      })
      .catch(err => {
        return done(err);
      })
  });
});

describe('3.5 Test Case delete a Order through endpoint orders/:orderId', () => {
  it('Should delete and return a notification', (done) => {
    chai.request(app)
      .delete(`${basePathOrders}/${order.body._id}`)
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