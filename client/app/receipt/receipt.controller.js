'use strict';

(function(){

class ReceiptComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('movieAppApp')
  .component('receipt', {
    templateUrl: 'app/receipt/receipt.html',
    controller: ReceiptComponent,
    controllerAs: 'receiptCtrl'
  });

})();
