'use strict';

describe('Component: ReceiptComponent', function () {

  // load the controller's module
  beforeEach(module('movieAppApp'));

  var ReceiptComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    ReceiptComponent = $componentController('receipt', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
