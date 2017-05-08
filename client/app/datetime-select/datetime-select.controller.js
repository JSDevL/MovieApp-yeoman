'use strict';

(function(){

class DatetimeSelectComponent {
  constructor($http, $scope, socket, booking) {
    this.$http = $http;
    this.socket = socket;
    this.theaterData = [];
    this.booking = booking;

    $scope.$on('$destroy', function(){
      socket.unsyncUpdates('movieTheaterEndpoint');
    });

    this.movie = booking.myFunc.selectedMovie;
  }

  $onInit() {
    this.$http.get('/api/movie-theater-endpoints').then(response => {
      this.boundData = response.data;
      var dates = [];
      for(let ele of this.boundData){
        if(ele.movie===this.movie){
          if(dates.length){
            dates.push(...ele.dates);
          } else{
            dates = ele.dates;
          }
        }
      }
      this.filteredDates = dates.filter(function(item, pos){
        return dates.indexOf(item)== pos;
      });
      this.filteredDates.sort();
      this.socket.syncUpdates('movieTheaterEndpoint', this.boundData);
    });
  }

  getTheaterDetails(date){
    this.booking.myFunc.selectedDate = date;
    this.theaterData = [];
    for(let ele of this.boundData){
      if(ele.movie===this.movie && ele.dates.includes(date)){
        if(this.theaterData.length){
          this.theaterData.push(ele);
        } else{
          this.theaterData = [ele];
        }
      }
    }
    console.log(this.theaterData);
  }

  sel(theater, timing) {
    this.booking.myFunc.selectedTheater = theater;
    this.booking.myFunc.selectedTime = timing;
  }

}

angular.module('movieAppApp')
  .component('datetimeSelect', {
    templateUrl: 'app/datetime-select/datetime-select.html',
    controller: DatetimeSelectComponent,
    controllerAs: 'datetimeSelectCtrl'
  });

})();
