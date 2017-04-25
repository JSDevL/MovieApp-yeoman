'use strict';

var app = require('../..');
import request from 'supertest';

var newTheaterEndpoint;

describe('TheaterEndpoint API:', function() {

  describe('GET /api/theater-endpoints', function() {
    var theaterEndpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/theater-endpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          theaterEndpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(theaterEndpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/theater-endpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/theater-endpoints')
        .send({
          name: 'New TheaterEndpoint',
          info: 'This is the brand new theaterEndpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTheaterEndpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created theaterEndpoint', function() {
      expect(newTheaterEndpoint.name).to.equal('New TheaterEndpoint');
      expect(newTheaterEndpoint.info).to.equal('This is the brand new theaterEndpoint!!!');
    });

  });

  describe('GET /api/theater-endpoints/:id', function() {
    var theaterEndpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/theater-endpoints/' + newTheaterEndpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          theaterEndpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      theaterEndpoint = {};
    });

    it('should respond with the requested theaterEndpoint', function() {
      expect(theaterEndpoint.name).to.equal('New TheaterEndpoint');
      expect(theaterEndpoint.info).to.equal('This is the brand new theaterEndpoint!!!');
    });

  });

  describe('PUT /api/theater-endpoints/:id', function() {
    var updatedTheaterEndpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/theater-endpoints/' + newTheaterEndpoint._id)
        .send({
          name: 'Updated TheaterEndpoint',
          info: 'This is the updated theaterEndpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTheaterEndpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTheaterEndpoint = {};
    });

    it('should respond with the updated theaterEndpoint', function() {
      expect(updatedTheaterEndpoint.name).to.equal('Updated TheaterEndpoint');
      expect(updatedTheaterEndpoint.info).to.equal('This is the updated theaterEndpoint!!!');
    });

  });

  describe('DELETE /api/theater-endpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/theater-endpoints/' + newTheaterEndpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when theaterEndpoint does not exist', function(done) {
      request(app)
        .delete('/api/theater-endpoints/' + newTheaterEndpoint._id)
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
