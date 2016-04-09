/**
 * Created by akash on 2/26/16.
 */
'use strict';
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService);

    function UserService($rootScope, $http) {

        var api = {
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            login: login,
            logout: logout,
            register: register

            /*setCurrentUser:setCurrentUser,
            getCurrentUser:getCurrentUser*/


        };
        return api;

        function findAllUsers(){
            return $http.get("/api/assignment/user")
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username="+username);
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete ("/api/assignment/user/"+userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/"+userId,user);
        }

        function login(user){
            return $http.post("/api/assignment/login", user);
        }

        function logout(){
            return $http.post("/api/assignment/logout");
        }

        function register(user){
            return $http.post("/api/assignment/register", user);
        }
    }
})();


/* function findUserByCredentials(username, password) {
 return $http.get("/api/assignment/user?username="+username+"&password="+password);
 }*/

/* function setCurrentUser(aUser) {
 $rootscope.newUser = aUser;
 }

 function getCurrentUser() {
 return $rootScope.newUser;
 }*/