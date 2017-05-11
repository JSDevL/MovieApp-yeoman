'use strict';

(function(){

class PaymentComponent {
  constructor($http, booking) {
    this.$http = $http;
    this.booking = booking;
  }

  $onInit() {
    this.selectedTheater = this.booking.myFunc.selectedTheater;
    this.selectedMovie = this.booking.myFunc.selectedMovie;
    this.selectedDate = this.booking.myFunc.selectedDate;
    this.selectedTime = this.booking.myFunc.selectedTime;
    this.selectedClass = this.booking.myFunc.selectedClass;
    this.selectedSeats = this.booking.myFunc.selectedSeats;
    this.price = this.booking.myFunc.price;
    this.totPrice = this.booking.myFunc.totPrice;
  }

  toggle(paymentType) {
    if(paymentType=='credit'){
      this.credit=true;
      this.cash=false;
      this.gv=false;
    }
    else if(paymentType=='cash'){
      this.cash=true;
      this.credit=false;
      this.gv=false;
    }
    else if(paymentType=='gv'){
      this.gv=true;
      this.cash=false;
      this.credit=false;
    }
  }

  submit() {
    this.$http.post('/api/payment-endpoints', {
      seatNos: this.selectedSeats
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
