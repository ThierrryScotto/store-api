'use strict'

// dependencies
require('dotenv').config();
const chai     = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// server
const app = require('../src/index.js');

// constant
const basePathAddress = '/v1/address';

// variables
let body;

// populate
const { client }  = require('./populate/client.populate.js');
const { address }   = require('./populate/address.populate.js');

describe('4.1 Test Case create a Address through endpoint Address', () => {
  it('Should create and return new Address', (done) => {
    address.body.clientId  = client.body._id;

    chai.request(app)
      .post(basePathAddress)
      .send(address.body)
      .then(res => {
        
        chai.expect(res.statusCode).eq(201);
        address.body = res.body;

        chai.expect(address.body).to.be.an('object', 'Your body is not an object!');

        done();
      })
      .catch(err => {
        return done(err);
      })
  });

  it('Should retrive a error because the Address object is invalid', (done) => {
    chai.request(app)
      .post(basePathAddress)
      .send(address.error)
      .then(res => {
        
        chai.expect(res.statusCode).eq(500);

        done();
      })
      .catch(err => {
        return done(err);
      })
  });
});

describe('4.2 Test Case edit a Address through endpoint address/:address', () => {
  it('Should edit and return Address', (done) => {
    address.edit.clientId = client.body._id
    
    chai.request(app)
      .put(`${basePathAddress}/${address.body._id}`)
      .send(address.edit)
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

describe('4.3 Test Case Get all Address through endpoint Address', () => {
  it('Should retrive All the address registered', (done) => {
    chai.request(app)
      .get(basePathAddress)
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

describe('4.4 Test Case Get Address by id through endpoint address/:address', () => {
  it('Should retrive Address by id', (done) => {
    chai.request(app)
      .get(`${basePathAddress}/${address.body._id}`)
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
      .get(`${basePathAddress}/${address.notFound._id}`)
      .then(res => {
        
        chai.expect(res.statusCode).eq(404);

        done();
      })
      .catch(err => {
        return done(err);
      })
  });
});

describe('4.5 Test Case delete a Address through endpoint address/:address', () => {
  it('Should delete and return a notification', (done) => {
    chai.request(app)
      .delete(`${basePathAddress}/${address.body._id}`)
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