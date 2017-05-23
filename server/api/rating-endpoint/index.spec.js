'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var ratingEndpointCtrlStub = {
  index: 'ratingEndpointCtrl.index',
  show: 'ratingEndpointCtrl.show',
  create: 'ratingEndpointCtrl.create',
  update: 'ratingEndpointCtrl.update',
  destroy: 'ratingEndpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var ratingEndpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './rating-endpoint.controller': ratingEndpointCtrlStub
});

describe('RatingEndpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(ratingEndpointIndex).to.equal(routerStub);
  });

  describe('GET /api/rating-endpoints', function() {

    it('should route to ratingEndpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'ratingEndpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/rating-endpoints/:id', function() {

    it('should route to ratingEndpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'ratingEndpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/rating-endpoints', function() {

    it('should route to ratingEndpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'ratingEndpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/rating-endpoints/:id', function() {

    it('should route to ratingEndpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'ratingEndpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/rating-endpoints/:id', function() {

    it('should route to ratingEndpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'ratingEndpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/rating-endpoints/:id', function() {

    it('should route to ratingEndpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'ratingEndpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
