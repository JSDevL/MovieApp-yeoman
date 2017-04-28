'use strict';

var app = require('../..');
import request from 'supertest';

var newMovieTheaterEndpoint;

describe('MovieTheaterEndpoint API:', function() {

  describe('GET /api/movie-theater-endpoints', function() {
    var movieTheaterEndpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/movie-theater-endpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          movieTheaterEndpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(movieTheaterEndpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/movie-theater-endpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/movie-theater-endpoints')
        .send({
          name: 'New MovieTheaterEndpoint',
          info: 'This is the brand new movieTheaterEndpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMovieTheaterEndpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created movieTheaterEndpoint', function() {
      expect(newMovieTheaterEndpoint.name).to.equal('New MovieTheaterEndpoint');
      expect(newMovieTheaterEndpoint.info).to.equal('This is the brand new movieTheaterEndpoint!!!');
    });

  });

  describe('GET /api/movie-theater-endpoints/:id', function() {
    var movieTheaterEndpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/movie-theater-endpoints/' + newMovieTheaterEndpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          movieTheaterEndpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      movieTheaterEndpoint = {};
    });

    it('should respond with the requested movieTheaterEndpoint', function() {
      expect(movieTheaterEndpoint.name).to.equal('New MovieTheaterEndpoint');
      expect(movieTheaterEndpoint.info).to.equal('This is the brand new movieTheaterEndpoint!!!');
    });

  });

  describe('PUT /api/movie-theater-endpoints/:id', function() {
    var updatedMovieTheaterEndpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/movie-theater-endpoints/' + newMovieTheaterEndpoint._id)
        .send({
          name: 'Updated MovieTheaterEndpoint',
          info: 'This is the updated movieTheaterEndpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMovieTheaterEndpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMovieTheaterEndpoint = {};
    });

    it('should respond with the updated movieTheaterEndpoint', function() {
      expect(updatedMovieTheaterEndpoint.name).to.equal('Updated MovieTheaterEndpoint');
      expect(updatedMovieTheaterEndpoint.info).to.equal('This is the updated movieTheaterEndpoint!!!');
    });

  });

  describe('DELETE /api/movie-theater-endpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/movie-theater-endpoints/' + newMovieTheaterEndpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when movieTheaterEndpoint does not exist', function(done) {
      request(app)
        .delete('/api/movie-theater-endpoints/' + newMovieTheaterEndpoint._id)
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
