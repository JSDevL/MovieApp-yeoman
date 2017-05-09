'use strict';

(function(){

class PaymentComponent {
  constructor($http, booking) {
    this.$http = $http;
    this.booking = booking;
    this.seatNos = booking.myFunc.bookedSeats;
  }

$onInit() {
  console.log(this.seatNos);
}

  submit() {
    this.$http.post('/api/payment-endpoints', {
      seatNos: this.seatNos
    });
    console.log("cwdc");
  }

}

angular.module('movieAppApp')
  .component('payment', {
    templateUrl: 'app/payment/payment.html',
    controller: PaymentComponent,
    controllerAs: 'paymentCtrl'
  });

})();
