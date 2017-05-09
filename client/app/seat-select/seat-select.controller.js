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

  constructor($http, booking) {
    this.totSeats = 1;
    this.count = 0;
    this.clicked = false;
    this.selectedSeats = [];
    this.classType = ["PREMIUM [RS.300]","GOLD [Rs.210]","SILVER [Rs.180]"];
    this.selectedClass;
    this.booking = booking;
    this.$http = $http;
    this.bookedSeats = [];
  }

  $onInit() {
    $('#myModal').modal();
    console.log(this.totSeats);
    this.$http.get('/api/payment-endpoints').then(response => {
      this.bookedSeats = response.data;
    });
    console.log($('.seat').attr('data-row'));
  }

  onClick(e){
    if ($(e.target).hasClass('selected-cell')){
      this.count--;
      this.selectedSeats = this.selectedSeats.filter(function(seat){
        return (seat.row != $(e.target).attr('data-row')) || (seat.col != $(e.target).attr('data-col'));
      });
    }
    else{
      if(this.selectedSeats.length){
        for(let ele of this.selectedSeats){
          if(ele.classType !== $(e.target).attr('data-classType')){
            this.selectedSeats=[];
            this.count=0;
          }
        }
      }
      if (this.count<this.totSeats){
        this.selectedSeats.push({
          row: $(e.target).attr('data-row'),
          col: $(e.target).attr('data-col'),
          classType: $(e.target).attr('data-classType')
        });
        this.count++;
        this.selectedClass = $(e.target).attr('data-classType');
      }
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
    for(let ele of this.selectedSeats){
        if(ele.row==r && ele.col==c){
          return true;
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
    var seatNo = [];
    for(let ele of this.selectedSeats){
      seatNo.push(String.fromCharCode(65 + (ele.row-1))+ele.col);
    }
    this.booking.myFunc.bookedSeats = seatNo;
  }

}

angular.module('movieAppApp')
  .component('seatSelect', {
    templateUrl: 'app/seat-select/seat-select.html',
    controller: SeatSelectComponent,
    controllerAs: 'seatSelectCtrl'
  });

})();
