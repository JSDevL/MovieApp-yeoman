'use strict';

var app = require('../..');
import request from 'supertest';

var newMoviesModel;

describe('MoviesModel API:', function() {

  describe('GET /api/moviesModel', function() {
    var moviesModels;

    beforeEach(function(done) {
      request(app)
        .get('/api/moviesModel')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          moviesModels = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(moviesModels).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/moviesModel', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/moviesModel')
        .send({
          name: 'New MoviesModel',
          info: 'This is the brand new moviesModel!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMoviesModel = res.body;
          done();
        });
    });

    it('should respond with the newly created moviesModel', function() {
      expect(newMoviesModel.name).to.equal('New MoviesModel');
      expect(newMoviesModel.info).to.equal('This is the brand new moviesModel!!!');
    });

  });

  describe('GET /api/moviesModel/:id', function() {
    var moviesModel;

    beforeEach(function(done) {
      request(app)
        .get('/api/moviesModel/' + newMoviesModel._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          moviesModel = res.body;
          done();
        });
    });

    afterEach(function() {
      moviesModel = {};
    });

    it('should respond with the requested moviesModel', function() {
      expect(moviesModel.name).to.equal('New MoviesModel');
      expect(moviesModel.info).to.equal('This is the brand new moviesModel!!!');
    });

  });

  describe('PUT /api/moviesModel/:id', function() {
    var updatedMoviesModel;

    beforeEach(function(done) {
      request(app)
        .put('/api/moviesModel/' + newMoviesModel._id)
        .send({
          name: 'Updated MoviesModel',
          info: 'This is the updated moviesModel!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMoviesModel = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMoviesModel = {};
    });

    it('should respond with the updated moviesModel', function() {
      expect(updatedMoviesModel.name).to.equal('Updated MoviesModel');
      expect(updatedMoviesModel.info).to.equal('This is the updated moviesModel!!!');
    });

  });

  describe('DELETE /api/moviesModel/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/moviesModel/' + newMoviesModel._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when moviesModel does not exist', function(done) {
      request(app)
        .delete('/api/moviesModel/' + newMoviesModel._id)
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
