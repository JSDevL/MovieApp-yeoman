'use strict';

(function(){

class ReceiptComponent {
  constructor($http, booking) {
    this.$http = $http;
    this.booking = booking;
  }

  $onInit() {
    this.selectedPoster = this.booking.selectedPoster;
    this.selectedTheater = this.booking.selectedTheater;
    this.selectedMovie = this.booking.selectedMovie;
    this.selectedDate = this.booking.selectedDate;
    this.selectedTime = this.booking.selectedTime;
    this.selectedClass = this.booking.selectedClass;
    this.selectedSeats = this.booking.selectedSeats;
    this.price = this.booking.price;
    this.totPrice = this.booking.totPrice;
  }
}

angular.module('movieAppApp')
  .component('receipt', {
    templateUrl: 'app/receipt/receipt.html',
    controller: ReceiptComponent,
    controllerAs: 'receiptCtrl'
  });

})();
