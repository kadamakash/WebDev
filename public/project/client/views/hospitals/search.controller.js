/**
 * Created by akash on 4/17/16.
 */
"use strict";
(function(){
    angular
        .module("MedicalTourismApp")
        .controller("SearchController", SearchController);

    function SearchController(HospitalService, $routeParams, $location){
        var vm = this;
        vm.renderResult = renderResult;
        vm.search = search;

        function init(){
            var name = $routeParams.name;
                vm.name = name;
                renderResult(name);
        }
        init();

        function renderResult(name){
            vm.message = null;
            HospitalService
                .findHospitalByCity(name,
                function(response){
                    if(response && response.length > 0){
                        vm.hospitals = response;
                    } else {
                        vm.message = "No Hospital records found for this city"
                    }
                });
        }

        function search(name){
            $location.url('/search/' +name);
        }

    }
})();
