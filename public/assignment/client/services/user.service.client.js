/**
 * Created by akash on 2/26/16.
 */
'use strict';
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope) {

        var api = {
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            login: login,
            logout: logout,
            getLoggedinUser: getLoggedinUser,
            setCurrentUser:setCurrentUser,
            getCurrentUser:getCurrentUser


        };
        return api;

        function findAllUsers(){
            return $http.get("/api/assignment/user")
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user/username/"+username);
        }

        function createUser(user) {
            return $http.post("/api/assignment/register", user);
        }

        function deleteUserById(userId) {
            return $http.delete ("/api/assignment/user/"+userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/"+userId, user);
        }

        function login(credentials){
            return $http.post("/api/assignment/login", credentials);
        }

        function logout(){
            return $http.post("/api/assignment/logout");
        }

        function getLoggedinUser(){
            return $http.get("/api/assignment/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function findUserById(userId){
            return $http.get("/api/assignment/user/"+userId);
        }

    }
})();

