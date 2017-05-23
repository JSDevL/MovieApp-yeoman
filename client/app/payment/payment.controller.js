'use strict';

(function(){

class PaymentComponent {
  constructor($http, $location, booking, Auth) {
    this.$http = $http;
    this.booking = booking;
    this.$location = $location;
    this.currentUser = Auth.getCurrentUser().name;
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
      userName: this.currentUser,
      movieName: this.selectedMovie,
      theaterName: this.selectedTheater,
      classType: this.selectedClass,
      seatNos: this.selectedSeats,
      date: this.selectedDate,
      time: this.selectedTime
    });
    this.$location.path('/receipt');
  }

}

angular.module('movieAppApp')
  .component('payment', {
    templateUrl: 'app/payment/payment.html',
    controller: PaymentComponent,
    controllerAs: 'paymentCtrl'
  });

})();
