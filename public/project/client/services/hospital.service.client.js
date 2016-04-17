/**
 * Created by akash on 4/17/16.
 */
"use strict";
(function (){
    angular
        .module("MedicalTourismApp")
        .factory("HospitalService", HospitalService);

    function HospitalService($http){

        var api = {
            findHospitalByCity: findHospitalByCity,
            findHospitalById: findHospitalById
        };
        return api;

        function findHospitalByCity(name, callback){
            $http.get("https://data.medicare.gov/resource/xubh-q36u.json?city="+ name)
                .success(callback);
        }

        function findHospitalById(provider_id, callback){
            $http.get("https://data.medicare.gov/resource/xubh-q36u.json?provider_id="+ provider_id)
                .success(callback);
        }

    }
})();