'use strict';

(function(){

class TheaterComponent {
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.theatersData = [];
    this.newTheater = [];
    this.cityName;
    this.findCity = [];
    this.citiesData = [];
    this.viewMovie = false;

    $scope.$on('$destroy', function(){
      socket.unsyncUpdates('theaterEndpoint');
      socket.unsyncUpdates('city');
    })
  }

  $onInit() {
    this.$http.get('/api/theater-endpoints').then(response => {
      this.theatersData = response.data;
      this.socket.syncUpdates('theaterEndpoint', this.theatersData);
    });
    this.$http.get('/api/cities').then(response => {
      this.citiesData = response.data;
      this.socket.syncUpdates('city', this.citiesData);
    });
  }

  addCity() {
    var city = prompt("Enter a new city");
    this.$http.post('/api/cities', {
      name: city
    });
  }

  addTheater() {

    /* to citiesdetails collection */
    for(let city of this.citiesData){
      if(city.name===this.cityName){
        this.selectedCity = city;
        this.theatersList = city.theater;
      }
    }
    this.$http.put('/api/cities/' + this.selectedCity._id, {
      $push: {
        theater: this.newTheater.name
      }
     });

    /* to theaterdetails collection */
    this.$http.post('/api/theater-endpoints/', {
      name: this.newTheater.name,
      location: this.newTheater.location
    });

    this.newTheater = '';
    this.cityName = ''
    this.findCity = '';
    this.viewMovie = false;
  }

  getTheaters() {
    console.log(this.citiesData);
    for(let city of this.citiesData){
      if(city.name===this.findCity){
        this.theatersList = city.theater;
      }
    }
    this.viewMovie = true;
  }

  deleteTheater(theaterToDel) {

    for(let city of this.citiesData){
      if(city.name===this.findCity){
        var cityId = city._id;
      }
    }

    this.$http.put('/api/cities/' + cityId, {
      name: this.findCity,
      theater: this.theatersList.filter(function(theater) {
        return theater!==theaterToDel
      })
    })
    .then(response => {
      console.log(this.citiesData);
      for(let city of this.citiesData){
        if(city.name===this.findCity){
          this.theatersList = city.theater;
        }
      }
    })

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
