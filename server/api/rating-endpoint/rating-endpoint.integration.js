'use strict';

var app = require('../..');
import request from 'supertest';

var newRatingEndpoint;

describe('RatingEndpoint API:', function() {

  describe('GET /api/rating-endpoints', function() {
    var ratingEndpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/rating-endpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ratingEndpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(ratingEndpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/rating-endpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/rating-endpoints')
        .send({
          name: 'New RatingEndpoint',
          info: 'This is the brand new ratingEndpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newRatingEndpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created ratingEndpoint', function() {
      expect(newRatingEndpoint.name).to.equal('New RatingEndpoint');
      expect(newRatingEndpoint.info).to.equal('This is the brand new ratingEndpoint!!!');
    });

  });

  describe('GET /api/rating-endpoints/:id', function() {
    var ratingEndpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/rating-endpoints/' + newRatingEndpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ratingEndpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      ratingEndpoint = {};
    });

    it('should respond with the requested ratingEndpoint', function() {
      expect(ratingEndpoint.name).to.equal('New RatingEndpoint');
      expect(ratingEndpoint.info).to.equal('This is the brand new ratingEndpoint!!!');
    });

  });

  describe('PUT /api/rating-endpoints/:id', function() {
    var updatedRatingEndpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/rating-endpoints/' + newRatingEndpoint._id)
        .send({
          name: 'Updated RatingEndpoint',
          info: 'This is the updated ratingEndpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRatingEndpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRatingEndpoint = {};
    });

    it('should respond with the updated ratingEndpoint', function() {
      expect(updatedRatingEndpoint.name).to.equal('Updated RatingEndpoint');
      expect(updatedRatingEndpoint.info).to.equal('This is the updated ratingEndpoint!!!');
    });

  });

  describe('DELETE /api/rating-endpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/rating-endpoints/' + newRatingEndpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when ratingEndpoint does not exist', function(done) {
      request(app)
        .delete('/api/rating-endpoints/' + newRatingEndpoint._id)
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
