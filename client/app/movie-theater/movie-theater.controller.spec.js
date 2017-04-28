'use strict';

describe('Component: MovieTheaterComponent', function () {

  // load the controller's module
  beforeEach(module('movieAppApp'));

  var MovieTheaterComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    MovieTheaterComponent = $componentController('movie-theater', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
