'use strict';

(function(){

class TheaterComponent {
  constructor($http, $scope, socket) {
    this.message = 'Hello';
    this.$http = $http;
    this.socket = socket;
    this.theatersData = [];
    this.newTheater = [];
    this.cityName;

    $scope.$on('$destroy', function(){
      socket.unsyncUpdates('theaterEndpoint');
    })
  }

  $onInit() {
    this.$http.get('/api/theater-endpoints').then(response => {
      this.theatersData = response.data;
      this.socket.syncUpdates('theaterEndpoint', this.theatersData);
      console.log(response.data[0]);
    });
  }

  addTheater() {
    var theater = {
      name: this.newTheater.name,
      location: this.newTheater.location,
      screens: this.newTheater.screens,
      seats: this.newTheater.seats
    }

    this.$http.post('/api/theater-endpoints/', {
      name: this.cityName,
      theater: [
        theater
      ]
    });
  }

  deleteTheater(theater) {
    this.$http.delete('/api/theater-endpoints/' + theater._id);
  }

  updateTheater(theater) {
    var location = prompt("change location in " + theater.city);
    this.$http.put('/api/theater-endpoints/' + theater._id, {
      location: location
    });
  }

}

angular.module('movieAppApp')
  .component('theater', {
    templateUrl: 'app/theater/theater.html',
    controller: TheaterComponent,
    controllerAs: 'theaterCtrl'
  });

})();
