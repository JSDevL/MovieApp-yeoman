'use strict';

(function(){

class PaymentComponent {
  constructor(booking) {
    this.booking = booking;
    this.seatNos = booking.myFunc.bookedSeats;
    console.log(this.seatNos);
  }

  submit() {
    this.http.post('/api/payment-endpoints', {
      seatNos: this.seatNos
    });
  }

}

angular.module('movieAppApp')
  .component('payment', {
    templateUrl: 'app/payment/payment.html',
    controller: PaymentComponent,
    controllerAs: 'paymentCtrl'
  });

})();
