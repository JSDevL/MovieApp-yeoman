'use strict';

(function(){

  class MovieTheaterComponent {
    constructor($http, $scope, socket, booking) {
      this.$http = $http;
      this.socket = socket;
      this.movieName;
      this.cityName;
      this.theaterName;
      this.dates;
      this.times;
      this.theatersList = [];
      this.ogDatesList = [];
      this.datesList = [];
      this.timesList = [];

      $scope.$on('$destroy', function(){
        socket.unsyncUpdates('adminViewEndpoint');
        socket.unsyncUpdates('city');
        socket.unsyncUpdates('movieTheaterEndpoint');
      });
    }

    $onInit() {
      this.$http.get('/api/admin-view-endpoints').then(response => {
        this.moviesData = response.data;
        this.socket.syncUpdates('adminViewEndpoint', this.moviesData);
      });
      this.$http.get('/api/cities').then(response => {
        this.citiesData = response.data;
        this.socket.syncUpdates('city', this.citiesData);
      });
      this.$http.get('/api/movie-theater-endpoints').then(response => {
        this.boundData = response.data;
        this.socket.syncUpdates('movieTheaterEndpoint', this.boundData);
      });
    }

    getTheaters() {
      for(let city of this.citiesData){
        if(city.name===this.cityName){
          this.theatersList = city.theater;
        }
      }
    }

    getTheaterDetails(theaterName) {
      this.theaterName=theaterName;
      this.datesList=[];
      this.timesList=[];
      if(this.boundData.length){
        for(let ele of this.boundData){
          if(ele.city===this.cityName && ele.movie===this.movieName && ele.theater===theaterName){
            this.datesList.push(...ele.dates);
            this.timesList = ele.times;
          }
        }
      }
    }

    addDate() {
      function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        } return i;
      }
      var date = addZero(new Date(this.date).getDate());
      var month = addZero(new Date(this.date).getMonth()+1);
      var year = new Date(this.date).getFullYear();
      var fullDate = date+"."+month+"."+year;
      this.datesList.push(fullDate);
      this.ogDatesList.push(this.date);
      this.date='';
    }

    deleteDate(date) {
      var pos = this.datesList.indexOf(date);
      this.datesList.splice(pos, 1);
    }

    addTime() {
      function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        } return i;
      }
      var hour = addZero(new Date(this.time).getHours());
      var min = addZero(new Date(this.time).getMinutes());
      var time = hour+":"+min;
      this.timesList.push(time);
      this.time='';
    }

    deleteTime(time) {
      var pos = this.timesList.indexOf(time);
      this.timesList.splice(pos, 1);
    }

    saveDetails() {
      if(this.boundData.length){
        for(let ele of this.boundData){
          if(ele.city===this.cityName && ele.movie===this.movieName && ele.theater===this.theaterName){
            console.log("A");
            return this.$http.put('/api/movie-theater-endpoints/' + ele._id, {
              dates: this.ogDatesList,
              times: this.timesList
            });
          } else if(ele.city!==this.cityName || ele.movie!==this.movieName || ele.theater!==this.theaterName){
            console.log("B");
            this.$http.post('/api/movie-theater-endpoints', {
              city: this.cityName,
              movie: this.movieName,
              theater: this.theaterName,
              dates: this.ogDatesList,
              times: this.timesList
            });
          }
        }
      } else{
        console.log("C");
        this.$http.post('/api/movie-theater-endpoints', {
          city: this.cityName,
          movie: this.movieName,
          theater: this.theaterName,
          dates: this.ogDatesList,
          times: this.timesList
        });
      }
      this.cityName='';
      this.movieName='';
      this.theaterName='';
    }

    deleteMapping(theaterName) {
      for(let ele of this.boundData){
        if(ele.city===this.cityName && ele.movie===this.movieName && ele.theater===theaterName){
          if(confirm(this.movieName + " is mapped to " + theaterName + ". Are you sure you want to remove it?") === true){
            this.$http.delete('/api/movie-theater-endpoints/' + ele._id);
          }
        }
      }
    }


  }

  angular.module('movieAppApp')
  .component('movieTheater', {
    templateUrl: 'app/movie-theater/movie-theater.html',
    controller: MovieTheaterComponent,
    controllerAs: 'movieTheaterCtrl'
  });

})();
