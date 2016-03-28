/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function(){
    angular
        .module("HospitalCompareApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser:createUser,
            deleteUserById:deleteUserById,
            updateUser:updateUser,
            setCurrentUser:setCurrentUser,
            getCurrentUser:getCurrentUser,
            getCurrentSessionUser: getCurrentSessionUser,
            logout: logout,

        };
        return api;

        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user?username="+username+"&password="+password);
        }

        function findAllUsers(){
            return $http.get("/api/project/user");
        }

        function createUser(user) {
            return $http.post("/api/project/user",user);
        }

        function deleteUserById(userId) {
            return $http.delete ("/api/project/user/"+userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/"+userId,user);
        }

        function setCurrentUser(aUser) {
            $rootScope.newUser = aUser;

        }

        function getCurrentUser() {
            return $rootScope.newUser;
        }

        function getCurrentSessionUser(){
            return $hrrp.get("/api/project/loggedin");
        }

        function logout(){
            return $http.post("/api/project/logout");
        }
    }
})();