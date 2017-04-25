'use strict';

var app = require('../..');
import request from 'supertest';

var newAdminViewEndpoint;

describe('AdminViewEndpoint API:', function() {

  describe('GET /api/admin-view-endpoints', function() {
    var adminViewEndpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/admin-view-endpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          adminViewEndpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(adminViewEndpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/admin-view-endpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/admin-view-endpoints')
        .send({
          name: 'New AdminViewEndpoint',
          info: 'This is the brand new adminViewEndpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newAdminViewEndpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created adminViewEndpoint', function() {
      expect(newAdminViewEndpoint.name).to.equal('New AdminViewEndpoint');
      expect(newAdminViewEndpoint.info).to.equal('This is the brand new adminViewEndpoint!!!');
    });

  });

  describe('GET /api/admin-view-endpoints/:id', function() {
    var adminViewEndpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/admin-view-endpoints/' + newAdminViewEndpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          adminViewEndpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      adminViewEndpoint = {};
    });

    it('should respond with the requested adminViewEndpoint', function() {
      expect(adminViewEndpoint.name).to.equal('New AdminViewEndpoint');
      expect(adminViewEndpoint.info).to.equal('This is the brand new adminViewEndpoint!!!');
    });

  });

  describe('PUT /api/admin-view-endpoints/:id', function() {
    var updatedAdminViewEndpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/admin-view-endpoints/' + newAdminViewEndpoint._id)
        .send({
          name: 'Updated AdminViewEndpoint',
          info: 'This is the updated adminViewEndpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAdminViewEndpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAdminViewEndpoint = {};
    });

    it('should respond with the updated adminViewEndpoint', function() {
      expect(updatedAdminViewEndpoint.name).to.equal('Updated AdminViewEndpoint');
      expect(updatedAdminViewEndpoint.info).to.equal('This is the updated adminViewEndpoint!!!');
    });

  });

  describe('DELETE /api/admin-view-endpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/admin-view-endpoints/' + newAdminViewEndpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when adminViewEndpoint does not exist', function(done) {
      request(app)
        .delete('/api/admin-view-endpoints/' + newAdminViewEndpoint._id)
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
