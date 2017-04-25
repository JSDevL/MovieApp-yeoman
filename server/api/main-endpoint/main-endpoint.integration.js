'use strict';

var app = require('../..');
import request from 'supertest';

var newMainEndpoint;

describe('MainEndpoint API:', function() {

  describe('GET /api/main-endpoints', function() {
    var mainEndpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/main-endpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          mainEndpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(mainEndpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/main-endpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/main-endpoints')
        .send({
          name: 'New MainEndpoint',
          info: 'This is the brand new mainEndpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMainEndpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created mainEndpoint', function() {
      expect(newMainEndpoint.name).to.equal('New MainEndpoint');
      expect(newMainEndpoint.info).to.equal('This is the brand new mainEndpoint!!!');
    });

  });

  describe('GET /api/main-endpoints/:id', function() {
    var mainEndpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/main-endpoints/' + newMainEndpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          mainEndpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      mainEndpoint = {};
    });

    it('should respond with the requested mainEndpoint', function() {
      expect(mainEndpoint.name).to.equal('New MainEndpoint');
      expect(mainEndpoint.info).to.equal('This is the brand new mainEndpoint!!!');
    });

  });

  describe('PUT /api/main-endpoints/:id', function() {
    var updatedMainEndpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/main-endpoints/' + newMainEndpoint._id)
        .send({
          name: 'Updated MainEndpoint',
          info: 'This is the updated mainEndpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMainEndpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMainEndpoint = {};
    });

    it('should respond with the updated mainEndpoint', function() {
      expect(updatedMainEndpoint.name).to.equal('Updated MainEndpoint');
      expect(updatedMainEndpoint.info).to.equal('This is the updated mainEndpoint!!!');
    });

  });

  describe('DELETE /api/main-endpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/main-endpoints/' + newMainEndpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when mainEndpoint does not exist', function(done) {
      request(app)
        .delete('/api/main-endpoints/' + newMainEndpoint._id)
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
