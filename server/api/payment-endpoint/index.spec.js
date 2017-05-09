'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var paymentEndpointCtrlStub = {
  index: 'paymentEndpointCtrl.index',
  show: 'paymentEndpointCtrl.show',
  create: 'paymentEndpointCtrl.create',
  update: 'paymentEndpointCtrl.update',
  destroy: 'paymentEndpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var paymentEndpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './payment-endpoint.controller': paymentEndpointCtrlStub
});

describe('PaymentEndpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(paymentEndpointIndex).to.equal(routerStub);
  });

  describe('GET /api/payment-endpoints', function() {

    it('should route to paymentEndpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'paymentEndpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/payment-endpoints/:id', function() {

    it('should route to paymentEndpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'paymentEndpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/payment-endpoints', function() {

    it('should route to paymentEndpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'paymentEndpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/payment-endpoints/:id', function() {

    it('should route to paymentEndpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'paymentEndpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/payment-endpoints/:id', function() {

    it('should route to paymentEndpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'paymentEndpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/payment-endpoints/:id', function() {

    it('should route to paymentEndpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'paymentEndpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
