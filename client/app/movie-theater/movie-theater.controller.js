'use strict';

(function(){

  class MovieTheaterComponent {
    constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.movieName;
      this.cityName;
      this.theaterName;
      this.dates;
      this.times;
      this.theatersList = [];
      this.datesList = [];
      this.timesList = [];

      $scope.$on('$destroy', function(){
        socket.unsyncUpdates('adminViewEndpoint');
        socket.unsyncUpdates('city');
        socket.unsyncUpdates('movieTheaterEndpoint');
      });


      $(function() {
        $("li").click(function(e) {
          e.preventDefault();
          $("li").removeClass("active");
          $(this).parent().addClass("active");
        });
      });

    }

    $onInit() {
      this.$http.get('/api/admin-view-endpoints').then(response => {
        this.moviesData = response.data;
        console.log(this.moviesData);
        this.socket.syncUpdates('adminViewEndpoint', this.moviesData);
      });
      this.$http.get('/api/cities').then(response => {
        this.citiesData = response.data;
        console.log(this.citiesData);
        this.socket.syncUpdates('city', this.citiesData);
      });
      this.$http.get('/api/movie-theater-endpoints').then(response => {
        this.boundData = response.data;
        console.log(this.boundData);
        this.socket.syncUpdates('movieTheaterEndpoint', this.boundData);
      });
    }

    getTheaters() {
      for(let city of this.citiesData){
        if(city.name===this.cityName){
          this.theatersList = city.theater;
          console.log(this.theatersList);
        }
      }
    }

    getTheaterDetails(theaterName) {
      this.theaterName=theaterName;
      this.datesList='';
      this.timesList='';
      if(this.boundData.length){
        for(let ele of this.boundData){
          if(ele.city===this.cityName && ele.movie===this.movieName && ele.theater===theaterName){
            this.datesList = ele.dates;
            this.timesList = ele.times;
          }
        }
      }
    }

    addDate() {
      var date = new Date(this.date).toDateString();
      this.datesList.push(date);
      console.log(this.datesList);
      this.date='';
    }

    deleteDate(date) {
      var pos = this.datesList.indexOf(date);
      this.datesList.splice(pos, 1);
      console.log(this.datesList);
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
      console.log(this.time);
      console.log(this.timesList);
      this.time='';
    }

    deleteTime(time) {
      var pos = this.timesList.indexOf(time);
      this.timesList.splice(pos, 1);
      console.log(this.timesList);
    }

    saveDetails() {
      if(this.boundData.length){
        for(let ele of this.boundData){
          if(ele.city===this.cityName && ele.movie===this.movieName && ele.theater===this.theaterName){
            return this.$http.put('/api/movie-theater-endpoints/' + ele._id, {
              dates: this.datesList,
              times: this.timesList
            });
          } else{
            this.$http.post('/api/movie-theater-endpoints', {
              city: this.cityName,
              movie: this.movieName,
              theater: this.theaterName,
              dates: this.datesList,
              times: this.timesList
            });
          }
        }
      } else{
        this.$http.post('/api/movie-theater-endpoints', {
          city: this.cityName,
          movie: this.movieName,
          theater: this.theaterName,
          dates: this.datesList,
          times: this.timesList
        });
      }
      this.cityName='';
      this.movieName='';
      this.theaterName='';
      this.datesList='';
      this.timesList='';
    }

    deleteMapping(theaterName) {
      for(let ele of this.boundData){
        if(ele.city===this.cityName && ele.movie===this.movieName && ele.theater===theaterName){
          if(confirm(theaterName + " is mapped to " + this.movieName + ". Are you sure you want to remove it?") === true){
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
