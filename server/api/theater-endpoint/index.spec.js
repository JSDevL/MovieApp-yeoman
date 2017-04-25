'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var theaterEndpointCtrlStub = {
  index: 'theaterEndpointCtrl.index',
  show: 'theaterEndpointCtrl.show',
  create: 'theaterEndpointCtrl.create',
  update: 'theaterEndpointCtrl.update',
  destroy: 'theaterEndpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var theaterEndpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './theater-endpoint.controller': theaterEndpointCtrlStub
});

describe('TheaterEndpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(theaterEndpointIndex).to.equal(routerStub);
  });

  describe('GET /api/theater-endpoints', function() {

    it('should route to theaterEndpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'theaterEndpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/theater-endpoints/:id', function() {

    it('should route to theaterEndpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'theaterEndpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/theater-endpoints', function() {

    it('should route to theaterEndpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'theaterEndpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/theater-endpoints/:id', function() {

    it('should route to theaterEndpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'theaterEndpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/theater-endpoints/:id', function() {

    it('should route to theaterEndpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'theaterEndpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/theater-endpoints/:id', function() {

    it('should route to theaterEndpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'theaterEndpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
