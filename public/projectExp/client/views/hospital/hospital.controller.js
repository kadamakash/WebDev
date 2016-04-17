"use strict";
(function(){
    angular
        .module("HospitalCompareApp")
        .controller("SearchController", searchController);

    function searchController($scope, $location, $routeParams, HospitalService) {

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