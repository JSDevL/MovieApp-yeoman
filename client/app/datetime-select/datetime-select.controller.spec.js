'use strict';

describe('Component: DatetimeSelectComponent', function () {

  // load the controller's module
  beforeEach(module('movieAppApp'));

  var DatetimeSelectComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    DatetimeSelectComponent = $componentController('datetime-select', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
