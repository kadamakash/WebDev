/**
 * Created by akash on 4/20/16.
 */
"use strict";
(function(){
    angular
        .module("MedicalTourismApp")
        .factory("QuoteService", QuoteService);

    function QuoteService($http){
        var api = {
            createQuote: createQuote
        };
        return api;

        function createQuote(userId, quote){
            return $http.post("/api/project/quote/"+ userId, quote);

        }
    }
})();