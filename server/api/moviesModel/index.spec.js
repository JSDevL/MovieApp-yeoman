'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var moviesModelCtrlStub = {
  index: 'moviesModelCtrl.index',
  show: 'moviesModelCtrl.show',
  create: 'moviesModelCtrl.create',
  update: 'moviesModelCtrl.update',
  destroy: 'moviesModelCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var moviesModelIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './moviesModel.controller': moviesModelCtrlStub
});

describe('MoviesModel API Router:', function() {

  it('should return an express router instance', function() {
    expect(moviesModelIndex).to.equal(routerStub);
  });

  describe('GET /api/moviesModel', function() {

    it('should route to moviesModel.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'moviesModelCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/moviesModel/:id', function() {

    it('should route to moviesModel.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'moviesModelCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/moviesModel', function() {

    it('should route to moviesModel.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'moviesModelCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/moviesModel/:id', function() {

    it('should route to moviesModel.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'moviesModelCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/moviesModel/:id', function() {

    it('should route to moviesModel.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'moviesModelCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/moviesModel/:id', function() {

    it('should route to moviesModel.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'moviesModelCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
