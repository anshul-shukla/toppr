'use strict';

/**
 * @ngdoc function
 * @name topprApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the topprApp
 */
angular.module('topprApp')
  .controller('MainCtrl', function ($scope,service) {

   $scope.details = [];
   $scope.count = 0;
   initUsr();
   getDetails();


   function initUsr(){
     $scope.user ={
       title : "",
       url : "",
       tag : ""
     };
   }


   $scope.likeIt = function(that){
     that.d.like += 1;
     localStorage.setItem("details", JSON.stringify($scope.details))
   }

  function getDetails(){
    if(localStorage.getItem("details")){
      $scope.details = JSON.parse(localStorage.getItem("details"));
      $scope.count = $scope.details.length;
    }else{
      var details = service.getWebDetails();
        details.then(function(response){
          var list = response.data.websites;
          list.map(function(d){
              d.like = 0;
          });
          $scope.count = list.length;
          $scope.details = list;
          localStorage.setItem("details", JSON.stringify(list))
        },function(){

        });
    }

  }


      $scope.submit = function(){
        var pushweb = service.pushWeb($scope.user.title,$scope.user.url,$scope.user.tag);
        pushweb.then(function(response){
          $scope.pushweb = response;
          initUsr();
        },function(){

        })
      }

  });
