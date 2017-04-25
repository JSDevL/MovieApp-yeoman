'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var mainEndpointCtrlStub = {
  index: 'mainEndpointCtrl.index',
  show: 'mainEndpointCtrl.show',
  create: 'mainEndpointCtrl.create',
  update: 'mainEndpointCtrl.update',
  destroy: 'mainEndpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var mainEndpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './main-endpoint.controller': mainEndpointCtrlStub
});

describe('MainEndpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(mainEndpointIndex).to.equal(routerStub);
  });

  describe('GET /api/main-endpoints', function() {

    it('should route to mainEndpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'mainEndpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/main-endpoints/:id', function() {

    it('should route to mainEndpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'mainEndpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/main-endpoints', function() {

    it('should route to mainEndpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'mainEndpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/main-endpoints/:id', function() {

    it('should route to mainEndpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'mainEndpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/main-endpoints/:id', function() {

    it('should route to mainEndpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'mainEndpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/main-endpoints/:id', function() {

    it('should route to mainEndpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'mainEndpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
