'use strict';

describe('Component: SeatSelectComponent', function () {

  // load the controller's module
  beforeEach(module('movieAppApp'));

  var SeatSelectComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    SeatSelectComponent = $componentController('seat-select', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
