/**
 * Created by akash on 3/11/16.
 */
"use strict";
(function(){

    angular
        .module("HospitalCompareApp")
        .factory("HospitalService", hospitalService);


    function hospitalService($http){

        var api = {
            findHospitalDetailsById: findHospitalDetailsById,
            findHospitalByZipcode: findHospitalByZipcode

        };
        return api;

        function findHospitalByZipcode(zipcode,callback){
            $http.get("https://data.medicare.gov/resource/xubh-q36u.json?city="+zipcode)
                .success(callback);
        }

        function findHospitalDetailsById(provider_id, callback){
            $http.get("https://data.medicare.gov/resource/xubh-q36u.json?provider_id="+provider_id)
                .success(callback);
        }
    }
})();


