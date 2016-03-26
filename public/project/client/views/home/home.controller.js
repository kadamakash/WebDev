/**
 * Created by akash on 3/25/16.
 */
"use strict";

(function(){
    angular
        .module("HospitalCompareApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $http, $location, HospitalService){


        $scope.search = search;
        $scope.zipcode = $routeParams.zipcode;

        if($scope.zipcode){

            search($scope.zipcode);
        }

        function search(zipcode){
            $location.url("/hospital/"+$scope.zipcode);
            console.log(zipcode);
            HospitalService.findHospitalByZipcode(
                zipcode,
                function(response){
                    console.log(response);
                    $scope.data = response;
                });
        }

    }
})();