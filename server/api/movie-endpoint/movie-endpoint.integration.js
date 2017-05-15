'use strict';

var app = require('../..');
import request from 'supertest';

var newMovieEndpoint;

describe('MovieEndpoint API:', function() {

  describe('GET /api/movie-endpoints', function() {
    var movieEndpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/movie-endpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          movieEndpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(movieEndpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/movie-endpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/movie-endpoints')
        .send({
          name: 'New MovieEndpoint',
          info: 'This is the brand new movieEndpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMovieEndpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created movieEndpoint', function() {
      expect(newMovieEndpoint.name).to.equal('New MovieEndpoint');
      expect(newMovieEndpoint.info).to.equal('This is the brand new movieEndpoint!!!');
    });

  });

  describe('GET /api/movie-endpoints/:id', function() {
    var movieEndpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/movie-endpoints/' + newMovieEndpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          movieEndpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      movieEndpoint = {};
    });

    it('should respond with the requested movieEndpoint', function() {
      expect(movieEndpoint.name).to.equal('New MovieEndpoint');
      expect(movieEndpoint.info).to.equal('This is the brand new movieEndpoint!!!');
    });

  });

  describe('PUT /api/movie-endpoints/:id', function() {
    var updatedMovieEndpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/movie-endpoints/' + newMovieEndpoint._id)
        .send({
          name: 'Updated MovieEndpoint',
          info: 'This is the updated movieEndpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMovieEndpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMovieEndpoint = {};
    });

    it('should respond with the updated movieEndpoint', function() {
      expect(updatedMovieEndpoint.name).to.equal('Updated MovieEndpoint');
      expect(updatedMovieEndpoint.info).to.equal('This is the updated movieEndpoint!!!');
    });

  });

  describe('DELETE /api/movie-endpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/movie-endpoints/' + newMovieEndpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when movieEndpoint does not exist', function(done) {
      request(app)
        .delete('/api/movie-endpoints/' + newMovieEndpoint._id)
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
