/**
 * Created by akash on 4/17/16.
 */
"use strict";
(function(){
    angular
        .module("MedicalTourismApp")
        .factory("AdminService", AdminService);

    function AdminService($http){
        var api = {
            findUserById: findUserById,
            findAllUsers: findAllUsers,
            createUser: createUser,
            updateUser: updateUser,
            deleteUserById: deleteUserById
        };
        return api;

        function findUserById(userId){
            return $http.get("/api/project/admin/user" + userId);
        }

        function findAllUsers(){
            return $http.get("/api/project/admin/user/");
        }

        function createUser(user){
            return $http.post("/api/project/admin/user", user);
        }

        function updateUser(userId, user){
            return $http.put("/api/project/admin/user/" + userId, user);
        }

        function deleteUserById(userId){
            return $http.delete("/api/project/admin/user" + userId);
        }

    }
})();