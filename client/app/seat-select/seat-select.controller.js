'use strict';

(function(){

class SeatSelectComponent {
  constructor() {
this.val;
    // $(function(){
    //   $('.seat').on("click", function(){
    //     $(this).toggleClass('selected-cell');
    //     if(this.count<this.val){
    //       console.log(this.count);
    //       this.count++;
    //     } else{
    //       console.log(this.count);
    //       window.alert("Can't select more seats");
    //     }
    //   });
    // });

  }

  $onInit() {
    $('#myModal').modal();
  }

  sample(val) {
    this.val = val;
    console.log(this.val);
    $('#myModal').modal('hide');
  }

}

angular.module('movieAppApp')
  .component('seatSelect', {
    templateUrl: 'app/seat-select/seat-select.html',
    controller: SeatSelectComponent,
    controllerAs: 'seatSelectCtrl'
  });

})();
