"use strict";
(function(){
    angular
        .module("MedicalTourismApp")
        .factory("ApartmentService", ApartmentService);

    function ApartmentService($http){
        var api = {
            findApartmentsByCity: findApartmentsByCity
            /*findApartmentDetailById: findApartmentDetailsById*/
        };
        return api;

        function findApartmentsByCity(code,callback) {
            $http.get("https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=GAGPBZuaEhR81NA3IIhcEH9xpKHgK27O&location="+code+"&check_in=2016-06-14&check_out=2016-06-16")
                .success(callback);
        }

    }
})();