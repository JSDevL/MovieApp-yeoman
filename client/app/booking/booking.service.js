'use strict';

function bookingService() {
  this.selectedMovie = '';
  this.selectedPoster = '';
  this.selectedTheater = '';
  this.selectedDate = '';
  this.selectedTime = '';
  this.selectedClass = '';
  this.selectedSeats = [];
  this.price = '';
  this.totPrice = '';
  this.userRole;
  this.userName;
}

angular.module('movieAppApp')
  .service('booking', bookingService);
