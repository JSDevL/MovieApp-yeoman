'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var adminViewEndpointCtrlStub = {
  index: 'adminViewEndpointCtrl.index',
  show: 'adminViewEndpointCtrl.show',
  create: 'adminViewEndpointCtrl.create',
  update: 'adminViewEndpointCtrl.update',
  destroy: 'adminViewEndpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var adminViewEndpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './admin-view-endpoint.controller': adminViewEndpointCtrlStub
});

describe('AdminViewEndpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(adminViewEndpointIndex).to.equal(routerStub);
  });

  describe('GET /api/admin-view-endpoints', function() {

    it('should route to adminViewEndpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'adminViewEndpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/admin-view-endpoints/:id', function() {

    it('should route to adminViewEndpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'adminViewEndpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/admin-view-endpoints', function() {

    it('should route to adminViewEndpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'adminViewEndpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/admin-view-endpoints/:id', function() {

    it('should route to adminViewEndpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'adminViewEndpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/admin-view-endpoints/:id', function() {

    it('should route to adminViewEndpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'adminViewEndpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/admin-view-endpoints/:id', function() {

    it('should route to adminViewEndpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'adminViewEndpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
