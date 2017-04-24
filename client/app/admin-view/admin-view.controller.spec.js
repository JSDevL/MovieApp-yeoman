'use strict';

describe('Component: AdminViewComponent', function () {

  // load the controller's module
  beforeEach(module('movieAppApp'));

  var AdminViewComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    AdminViewComponent = $componentController('admin-view', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
