'use strict';

function bookingService() {
    this.myFunc = function () {
      this.selectedMovie = '';
      this.selectedTheater = '';
      this.selectedDate = '';
      this.selectedTime = '';
      this.selectedClass = '';
      this.selectedSeats = [];
      this.price = '';
      this.totPrice = '';
    };
}

angular.module('movieAppApp')
  .service('booking', bookingService);
