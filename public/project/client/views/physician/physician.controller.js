/**
 * Created by akash on 4/18/16.
 */
"use strict";
(function(){
    angular
        .module("MedicalTourismApp")
        .controller("PhysicianController", PhysicianController);

    function PhysicianController(PhysicianService, $routeParams, $location, $filter){
        var vm = this;
        vm.search = search;
        vm.findPhysician = findPhysician;

        vm.toggleSort = toggleSort;
        var orderBy = $filter('orderBy');
        vm.predicate = 'frst_nm';
        vm.reverse = false;

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

        function search(city) {
            $location.url('/physician/' + city);
        }

        function toggleSort(predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
            vm.physicians = orderBy(vm.physicians, vm.predicate, vm.reverse);
        };



    }
})();