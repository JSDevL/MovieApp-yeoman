'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var movieTheaterEndpointCtrlStub = {
  index: 'movieTheaterEndpointCtrl.index',
  show: 'movieTheaterEndpointCtrl.show',
  create: 'movieTheaterEndpointCtrl.create',
  update: 'movieTheaterEndpointCtrl.update',
  destroy: 'movieTheaterEndpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var movieTheaterEndpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './movie-theater-endpoint.controller': movieTheaterEndpointCtrlStub
});

describe('MovieTheaterEndpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(movieTheaterEndpointIndex).to.equal(routerStub);
  });

  describe('GET /api/movie-theater-endpoints', function() {

    it('should route to movieTheaterEndpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'movieTheaterEndpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/movie-theater-endpoints/:id', function() {

    it('should route to movieTheaterEndpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'movieTheaterEndpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/movie-theater-endpoints', function() {

    it('should route to movieTheaterEndpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'movieTheaterEndpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/movie-theater-endpoints/:id', function() {

    it('should route to movieTheaterEndpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'movieTheaterEndpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/movie-theater-endpoints/:id', function() {

    it('should route to movieTheaterEndpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'movieTheaterEndpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/movie-theater-endpoints/:id', function() {

    it('should route to movieTheaterEndpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'movieTheaterEndpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
