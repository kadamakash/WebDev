/**
 * Created by akash on 4/15/16.
 */
"use strict";
(function(){
    angular
        .module("MedicalTourismApp")
        .controller("MainController", MainController);
    function MainController($scope, $location){
        $scope.$location = $location
    }
})();