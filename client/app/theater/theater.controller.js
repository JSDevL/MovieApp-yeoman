'use strict';

(function(){

class TheaterComponent {
  constructor($http) {
    this.message = 'Hello';
    this.$http = $http;
    this.theatersData = [];
    this.newTheater = [];
  }

  $onInit() {
    this.$http.get('/api/theater-endpoints').then(response => {
      this.theatersData = response.data;
    });
  }

  addTheater() {
    this.$http.post('/api/theater-endpoints/', {
      state: this.state,
      city: this.city
    });
  }

  deleteTheater(theater) {
    this.$http.delete('/api/theater-endpoints/' + theater._id);
  }

  updateTheater(theater) {
    var city = prompt("change city in " + theater.state);
    this.$http.put('/api/theater-endpoints/' + theater._id, {
      city: city
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
