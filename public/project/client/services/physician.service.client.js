/**
 * Created by akash on 4/18/16.
 */
"use strict";
(function(){
    angular
        .module("MedicalTourismApp")
        .factory("PhysicianService", PhysicianService);

    function PhysicianService($http){
        var api = {
            findPhysicianByCity: findPhysicianByCity
        };
        return api;

        function findPhysicianByCity(city, callback){
            $http.get("https://data.medicare.gov/resource/s63f-csi6.json?cty=" + city)
                .success(callback);
        }
    }
})();