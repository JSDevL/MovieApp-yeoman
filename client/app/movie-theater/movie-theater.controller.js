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
      this.ogDatesList = [];
      this.datesList = [];
      this.timesList = [];

      $scope.$on('$destroy', function(){
        socket.unsyncUpdates('movieEndpoint');
        socket.unsyncUpdates('city');
        socket.unsyncUpdates('movieTheaterEndpoint');
      });
    }

    $onInit() {
      this.$http.get('/api/movie-endpoints').then(response => {
        this.moviesData = response.data;
        this.socket.syncUpdates('movieEndpoint', this.moviesData);
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
      console.log(theaterName);
      this.theaterName=theaterName;
      this.datesList=[];
      this.timesList=[];
      function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        } return i;
      }
      if(this.boundData.length){
        for(let ele of this.boundData){
          if(ele.city===this.cityName && ele.movie===this.movieName && ele.theater===theaterName){
            for(let dateEle of ele.dates){
              var d = addZero(new Date(dateEle).getDate());
              var m = addZero(new Date(dateEle).getMonth()+1);
              var y = new Date(dateEle).getFullYear();
              var fullDate = d+"."+m+"."+y;
              this.datesList.push(fullDate);
            }
            // this.datesList.push(...ele.dates);
            this.timesList = ele.times;
            console.log(this.datesList);
            console.log(this.timesList);
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
      var d = addZero(new Date(this.date).getDate());
      var m = addZero(new Date(this.date).getMonth()+1);
      var y = new Date(this.date).getFullYear();
      var fullDate = d+"."+m+"."+y;
      this.datesList.push(fullDate);
      this.ogDatesList.push(this.date);
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
            console.log("adding date and time");
            return this.$http.put('/api/movie-theater-endpoints/' + ele._id, {
              dates: this.ogDatesList,
              times: this.timesList
            });
          } else if(ele.city!==this.cityName || ele.movie!==this.movieName || ele.theater!==this.theaterName){
            console.log("new mapping");
            return this.$http.post('/api/movie-theater-endpoints', {
              city: this.cityName,
              movie: this.movieName,
              theater: this.theaterName,
              dates: this.ogDatesList,
              times: this.timesList
            });
          }
        }
      } else{
        console.log("posting for the first time");
        this.$http.post('/api/movie-theater-endpoints', {
          city: this.cityName,
          movie: this.movieName,
          theater: this.theaterName,
          dates: this.ogDatesList,
          times: this.timesList
        });
      }
      this.datesList = [];
      this.movieName = '';
      this.cityName = '';
      this.theatersList = [];
      console.log("defw");
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
  .filter('cropFilt', function () {
    return function(x) {
      var i, txt = "";
      for (i = 0; i < x.length; i++) {
        if(x[i] !== " "){ txt+=x[i]; }
        else if(x[i] === " "){ return txt; }
      }
    };
  });
  angular.module('movieAppApp')
  .component('movieTheater', {
    templateUrl: 'app/movie-theater/movie-theater.html',
    controller: MovieTheaterComponent,
    controllerAs: 'movieTheaterCtrl'
  })
})();
