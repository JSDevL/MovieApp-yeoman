'use strict';

function bookingService() {
	// AngularJS will instantiate a singleton by calling "new" on this function
    this.myFunc = function () {
      this.selectedMovie = '';
      this.selectedDate = '';
      this.selectedTime = '';
      this.selectedSeats = '';
    };
}

angular.module('movieAppApp')
  .service('booking', bookingService);
