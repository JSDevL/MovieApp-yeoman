'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var movieEndpointCtrlStub = {
  index: 'movieEndpointCtrl.index',
  show: 'movieEndpointCtrl.show',
  create: 'movieEndpointCtrl.create',
  update: 'movieEndpointCtrl.update',
  destroy: 'movieEndpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var movieEndpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './movie-endpoint.controller': movieEndpointCtrlStub
});

describe('MovieEndpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(movieEndpointIndex).to.equal(routerStub);
  });

  describe('GET /api/movie-endpoints', function() {

    it('should route to movieEndpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'movieEndpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/movie-endpoints/:id', function() {

    it('should route to movieEndpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'movieEndpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/movie-endpoints', function() {

    it('should route to movieEndpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'movieEndpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/movie-endpoints/:id', function() {

    it('should route to movieEndpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'movieEndpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/movie-endpoints/:id', function() {

    it('should route to movieEndpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'movieEndpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/movie-endpoints/:id', function() {

    it('should route to movieEndpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'movieEndpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
