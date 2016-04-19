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
            findHospitalById: findHospitalById,
            findCareInfoById: findCareInfoById
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

        function findCareInfoById(provider_id, callback){
            $http.get("https://data.medicare.gov/resource/3z8n-wcgr.json?provider_id="+ provider_id)
                .success(callback);
        }
    }
})();