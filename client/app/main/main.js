'use strict';

$(document).ready(function(){
    $("#ex-carousel").carousel();

    $(".left").click(function(){
        $("#ex-carousel").carousel("prev");
    });

    $(".right").click(function(){
        $("#ex-carousel").carousel("next");
    });
});


angular.module('movieAppApp')
  .config(function($routeProvider) {
    $routeProvider.when('/', {
      template: '<main></main>'
    });
  });
