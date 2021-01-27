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

const product = {
  name        : "name_test",
  category    : "category_test",
  price       : 2.52,
  sizes       : [44, 46, 48],
  colors      : ["colors_test"],
  amount      : 20,
  gender      : "gender_test",
  description : "description_test",
  status      : 1
}

const productEdit = {
  name        : "test_name",
  category    : "test_category",
  price       : 5,
  sizes       : [48, 46, 44],
  colors      : ["colors_test"],
  amount      : 10,
  gender      : "test_gender",
  description : "test_description",
  status      : 1
}

const productNotFound = {
  id          : '600252d206a8cb00f035f724',
  name        : "name_test",
  category    : "category",
  price       : 2.52,
  sizes       : [44, 46, 48],
  colors      : ["colors_test"],
  amount      : 20,
  gender      : "gender_test",
  description : "description_test",
  status      : 1
}

const productError = {
  id          : '600252d206a8cb00f035f724',
  name        : "name_test",
  category    : "category",
  price       : 2.52
}

describe('01 Test Case create a Products through endpoint products', () => {
  it('Should create and return new Product', (done) => {
    chai.request(app)
      .post(basePath)
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

  it('Should retrive a error because the Product object is invalid', (done) => {
    chai.request(app)
      .post(basePath)
      .send(productError)
      .then(res => {
        
        chai.expect(res.statusCode).eq(500);

        done();
      })
      .catch(err => {
        return done(err);
      })
  });
});

describe('02 Test Case edit a Products through endpoint products/:productId', () => {
  it('Should edit and return Product', (done) => {
    chai.request(app)
      .put(`${basePath}/${body._id}`)
      .send(productEdit)
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

describe('03 Test Case Get all Products through endpoint products', () => {
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

describe('04 Test Case Get Products by id through endpoint products/:productId', () => {
  it('Should retrive Product by id', (done) => {
    chai.request(app)
      .get(`${basePath}/${body._id}`)
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
      .get(`${basePath}/${productNotFound.id}`)
      .then(res => {
        
        chai.expect(res.statusCode).eq(404);

        done();
      })
      .catch(err => {
        return done(err);
      })
  });
});

describe('05 Test Case delete a Products through endpoint products/:productId', () => {
  it('Should delete and return a notification', (done) => {
    chai.request(app)
      .delete(`${basePath}/${body._id}`)
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