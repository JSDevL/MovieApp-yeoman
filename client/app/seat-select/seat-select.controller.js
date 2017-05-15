'use strict';

(function(){

class SeatSelectComponent {
  generateArray(n){
    const ar = [];
    for(var i=1;i<=n;i++){
      ar.push(i);
    }
    return ar;
  }

  constructor($http, $location, booking) {
    this.totSeats = 1;
    this.count = 0;
    this.clicked = false;
    this.selectedSeats = [];
    this.classType = ["PREMIUM [RS.300]","GOLD [Rs.210]","SILVER [Rs.180]"];
    this.selectedClass;
    this.booking = booking;
    this.$http = $http;
    this.$location = $location;
    this.bookedSeats = [];
    this.seatNos = [];
  }

  $onInit() {
    $('#myModal').modal();
    console.log(this.totSeats);
    this.$http.get('/api/payment-endpoints').then(response => {
      this.bookedSeats = response.data;
    });
    this.selectedTheater = this.booking.myFunc.selectedTheater;
    this.selectedMovie = this.booking.myFunc.selectedMovie;
    this.selectedDate = this.booking.myFunc.selectedDate;
    this.selectedTime = this.booking.myFunc.selectedTime;
  }

  onClick(e){
    console.log(this.count);
    var singlePrice = parseInt($(e.target).attr('data-classType').slice(-4,-1));
    if(this.count==0){
      this.showPrice=false;
    }
    /*    if selected   */
    if($(e.target).hasClass('selected-cell')){
      this.count--;
      if(this.count==0){
        this.showPrice=false;
      }
      this.price = singlePrice/this.count;
      this.totPrice = this.price+4+15;
      this.seatNos = this.seatNos.filter(function(no){
        var row = parseInt(no.substr(0, 1).charCodeAt(0) - 65);
        var col = parseInt(no.substr(1));
        return (row != $(e.target).attr('data-row') || col != $(e.target).attr('data-col'));
      });
      this.selectedSeats = this.selectedSeats.filter(function(seat){
        return (seat.row != $(e.target).attr('data-row')) || (seat.col != $(e.target).attr('data-col'));
      });
    }
    /*    if unselected   */
    else{
      /*    if class mismatch   */
      if(this.selectedSeats.length){
        for(let ele of this.selectedSeats){
          if(ele.classType !== $(e.target).attr('data-classType')){
            this.selectedSeats=[];
            this.seatNos=[];
            this.count=0;
            console.log(this.count);
          }
        }
      }
      /*    to select   */
      if (this.count<this.totSeats){
        this.selectedSeats.push({
          row: $(e.target).attr('data-row'),
          col: $(e.target).attr('data-col'),
          classType: $(e.target).attr('data-classType')
        });
        this.count++;
        console.log(this.count);
        this.showPrice = true;
        this.selectedClass = $(e.target).attr('data-classType').slice(0,-9).concat(" CLASS");
        this.price = singlePrice*this.count;
        this.totPrice = this.price+4+15;
        this.seatNos.push(String.fromCharCode(64 + parseInt($(e.target).attr('data-row')))+$(e.target).attr('data-col'));
      }
      /*    if selecting more that count   */
      else{
        window.alert("Can't select more seats. Please increase the number of tickets needed.");
      }
      console.log(this.selectedSeats);
    }
  }

  isSelected(r,c) {
    for(let ele of this.selectedSeats){
        if(ele.row==r && ele.col==c){
          return true;
        }
    }
    return false;
  }

  isBooked(r,c) {
    for(let ele of this.bookedSeats){
      for(let seat of ele.seatNos){
        var row = seat.substr(0, 1).charCodeAt(0) - 64;
        var col = parseInt(seat.substr(1));
        if(r===row && c===col){
          return true;
        }
      }
    }
    return false;
  }

  getTotSeats(totSeats) {
    this.totSeats = totSeats;
    console.log(this.totSeats);
    $('#myModal').modal('hide');
  }

  submit() {
    this.booking.myFunc.selectedClass = this.selectedClass;
    this.booking.myFunc.selectedSeats = this.seatNos;
    this.booking.myFunc.totPrice = this.totPrice;
    this.booking.myFunc.price = this.price;
    this.$location.path('/payment');
  }

}

angular.module('movieAppApp')
  .component('seatSelect', {
    templateUrl: 'app/seat-select/seat-select.html',
    controller: SeatSelectComponent,
    controllerAs: 'seatSelectCtrl'
  });

})();
