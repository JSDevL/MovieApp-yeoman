'use strict';

function bookingService() {
    this.myFunc = function () {
      this.selectedMovie = '';
      this.selectedTheater = '';
      this.selectedDate = '';
      this.selectedTime = '';
      this.bookedSeats = [];
    };
}

angular.module('movieAppApp')
  .service('booking', bookingService);
