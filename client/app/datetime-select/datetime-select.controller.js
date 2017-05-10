'use strict';

(function(){

class DatetimeSelectComponent {
  constructor($http, $scope, $location, socket, booking) {
    this.$http = $http;
    this.$location = $location;
    this.socket = socket;
    this.theaterData = [];
    this.sortedDates = [];
    this.newDates = [];
    this.booking = booking;

    $scope.$on('$destroy', function(){
      socket.unsyncUpdates('movieTheaterEndpoint');
    });

    this.movie = booking.myFunc.selectedMovie;
  }

  $onInit() {
    var dates = [];
    this.$http.get('/api/movie-theater-endpoints').then(response => {
      this.boundData = response.data;

      for(let ele of this.boundData){
        if(ele.movie===this.movie){
          dates.push(...ele.dates);
        }
      }

      this.filteredDates = dates.filter(function(item, pos){
        return dates.indexOf(item)== pos;
      });

      for(var i=0;i<this.filteredDates.length-1;i++){
        if(this.filteredDates[i]>this.filteredDates[i+1]){
          var temp = this.filteredDates[i];
          this.filteredDates[i] = this.filteredDates[i+1];
          this.filteredDates[i+1] = temp;
        }
      }

      function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        } return i;
      }
      for(let dateEle of this.filteredDates){
        var date = addZero(new Date(dateEle).getDate());
        var month = addZero(new Date(dateEle).getMonth());
        var year = new Date(dateEle).getFullYear();
        var fullDate = date+"."+month+"."+year;
        this.newDates.push(fullDate);
      }
      this.socket.syncUpdates('movieTheaterEndpoint', this.boundData);
    });
  }

  getTheaterDetails(date){
    this.booking.myFunc.selectedDate = date;
    this.theaterData = [];
    var fullDate = new Date(date);
    for(let ele of this.boundData){
      console.log(ele);
      console.log(fullDate);
      // if(ele.movie===this.movie && ele.dates.includes(date)){
      //   if(this.theaterData.length){
      //     this.theaterData.push(ele);
      //   } else{
      //     this.theaterData = [ele];
      //   }
      // }
    }
  }

  sel(theater, timing) {
    this.booking.myFunc.selectedTheater = theater;
    this.booking.myFunc.selectedTime = timing;
    this.$location.path('/seat-select');
  }

}

angular.module('movieAppApp')
  .component('datetimeSelect', {
    templateUrl: 'app/datetime-select/datetime-select.html',
    controller: DatetimeSelectComponent,
    controllerAs: 'datetimeSelectCtrl'
  });

})();
