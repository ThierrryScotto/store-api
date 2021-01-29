'use strict'

// dependencies
require('dotenv').config();
const chai     = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// server
const app = require('../src/index.js');

// constant
const basePath = '/v1/clients';

const { client } = require('./populate/client.populate');

describe('01 Test Case create a Client through endpoint client', () => {
  it('Should create and return new Client', (done) => {
    chai.request(app)
      .post(basePath)
      .send(client.body)
      .then(res => {

        chai.expect(res.statusCode).eq(201);
        client.body  = res.body.createdClient;

        chai.expect(client.body).to.be.an('object', 'Your body is not an object!');

        done();
      })
      .catch(err => {
        return done(err);
      })
  });

  it('Should retrive a error because the Client object is invalid', (done) => {
    chai.request(app)
      .post(basePath)
      .send(client.notFound)
      .then(res => {
        
        chai.expect(res.statusCode).eq(500);

        done();
      })
      .catch(err => {
        return done(err);
      })
  });
});

describe('02 Test Case edit a Client through endpoint clients/:clientId', () => {
  it('Should edit and return Client', (done) => {
    chai.request(app)
      .put(`${basePath}/${client.body._id}`)
      .send(client.edit)
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

describe('03 Test Case Get Clients by id through endpoint clients/:clientId', () => {
  it('Should retrive Client by id', (done) => {
    chai.request(app)
      .get(`${basePath}/${client.body._id}`)
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
      .get(`${basePath}/${client.notFound._id}`)
      .then(res => {
        
        chai.expect(res.statusCode).eq(404);

        done();
      })
      .catch(err => {
        return done(err);
      })
  });
});