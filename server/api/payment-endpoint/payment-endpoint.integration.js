'use strict';

var app = require('../..');
import request from 'supertest';

var newPaymentEndpoint;

describe('PaymentEndpoint API:', function() {

  describe('GET /api/payment-endpoints', function() {
    var paymentEndpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/payment-endpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          paymentEndpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(paymentEndpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/payment-endpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/payment-endpoints')
        .send({
          name: 'New PaymentEndpoint',
          info: 'This is the brand new paymentEndpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPaymentEndpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created paymentEndpoint', function() {
      expect(newPaymentEndpoint.name).to.equal('New PaymentEndpoint');
      expect(newPaymentEndpoint.info).to.equal('This is the brand new paymentEndpoint!!!');
    });

  });

  describe('GET /api/payment-endpoints/:id', function() {
    var paymentEndpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/payment-endpoints/' + newPaymentEndpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          paymentEndpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      paymentEndpoint = {};
    });

    it('should respond with the requested paymentEndpoint', function() {
      expect(paymentEndpoint.name).to.equal('New PaymentEndpoint');
      expect(paymentEndpoint.info).to.equal('This is the brand new paymentEndpoint!!!');
    });

  });

  describe('PUT /api/payment-endpoints/:id', function() {
    var updatedPaymentEndpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/payment-endpoints/' + newPaymentEndpoint._id)
        .send({
          name: 'Updated PaymentEndpoint',
          info: 'This is the updated paymentEndpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPaymentEndpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPaymentEndpoint = {};
    });

    it('should respond with the updated paymentEndpoint', function() {
      expect(updatedPaymentEndpoint.name).to.equal('Updated PaymentEndpoint');
      expect(updatedPaymentEndpoint.info).to.equal('This is the updated paymentEndpoint!!!');
    });

  });

  describe('DELETE /api/payment-endpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/payment-endpoints/' + newPaymentEndpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when paymentEndpoint does not exist', function(done) {
      request(app)
        .delete('/api/payment-endpoints/' + newPaymentEndpoint._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
