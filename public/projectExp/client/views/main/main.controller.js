/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function(){
    angular
        .module("HospitalCompareApp")
        .controller("MainController", MainController);
    function MainController($scope, $location){
        $scope.$location = $location;
    }
})();