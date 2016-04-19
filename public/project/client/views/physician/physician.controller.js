/**
 * Created by akash on 4/18/16.
 */
"use strict";
(function(){
    angular
        .module("MedicalTourismApp")
        .controller("PhysicianController", PhysicianController);

    function PhysicianController(PhysicianService, $routeParams, $location){
        var vm = this;
        vm.search = search;
        vm.findPhysician = findPhysician;

        function init(){
            var city = $routeParams.city;
            vm.city = city;
            findPhysician(city);
        }
        init();

        function findPhysician(city) {
            vm.message = null;
            PhysicianService
                .findPhysicianByCity(city,
                    function (response) {
                        if (response && response.length > 0) {
                            vm.physicians = response;
                        } else {
                            vm.message = "No Physicians found in this city";
                        }
                    });
        }

        function search(city){
           $location.url('/physician/' +city);
            }



    }
})();