/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http){


    var api = {
        createFormForUser:createFormForUser,
        updateFormById:updateFormById,
        findAllFormsForUser:findAllFormsForUser,
        deleteFormById:deleteFormById
    };

        return api;

        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/user/"+userId+"/form", form);
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/"+formId, newForm);
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" +userId+ "/form");
        }

        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/"+formId);
        }

    }

})();
