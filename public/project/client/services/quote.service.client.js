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
            createQuote: createQuote,
            getQuoteForUser: getQuoteForUser,
            getAllQuotes: getAllQuotes,
            updateQuote: updateQuote
        };
        return api;

        function createQuote(quote){
            return $http.post("/api/project/quote", quote);
        }

        function getQuoteForUser(userId){
            return $http.get("/api/project/response", userId);
        }

        function getAllQuotes(){
            return $http.get("/api/project/quotes");
        }

        function updateQuote(username, response){
            return $http.put("/api/project/response/" + username, response);
        }
    }
})();