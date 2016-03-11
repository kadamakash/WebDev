"use strict";
(function(){

    angular
        .module("HospitalCompareApp")
        .factory("UserService", UserService)

    function UserService($rootScope){
        var users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"], "email":"", "favourites":["220070"]	},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"], "email":"", "favourites":["220070"] },
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"], "email":"", "favourites":["220070"]	},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"], "email":"", "favourites":["220070"] },
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"], "email":"", "favourites":["220070"] }
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser:createUser,
            deleteUserById:deleteUserById,
            updateUser:updateUser,
            setCurrentUser:setCurrentUser,
            getCurrentUser:getCurrentUser,

        };
        return api;

        function findUserByCredentials(username, password, callback) {
            for(var index=0;index<users.length;index++) {
                if(users[index].username == username) {
                    if(users[index].password==password) {
                        console.log(users[index]);
                        callback(users[index]);
                    }
                }
            }
            callback(null);
        }

        function findAllUsers(callback){
            return callback(users);
        }

        function createUser(user,callback) {
            user._id = (new Date()).getTime();
            users[users.length] = user;
            callback(user);
        }

        function deleteUserById(userId,callback) {
            for(var index=0;index<users.length;index++) {
                if(users[index]._id == userId) {
                    users.remove(index);
                }
            }
            callback(users);

        }

        function updateUser(userId, user, callback) {
            for(var index=0;index<users.length;index++) {
                if(users[index]._id == userId) {
                    users[index].firstName = user.firstName;
                    users[index].lastName = user.lastName;
                    users[index].password = user.password;
                    users[index].roles = user.roles;
                    users[index].username = user.username;
                    users[index].email = user.email;
                    users[index].favourites = user.favourites;
                }
            }
            callback(user);
        }

        function setCurrentUser(User1) {
            if(User1 == null) {
                $rootScope.newUser = null;
            }
            else {
                $rootScope.newUser = {"_id":User1._id, "firstName":User1.firstName, "lastName":User1.lastName,
                    "username":User1.username, "password":User1.password, "roles": User1.roles, "email":User1.email, "favourites":User1.favourites}
            }

        }

        function getCurrentUser() {
            return $rootScope.newUser;
        }

    }


    /*var SEARCH_URL = "https://data.medicare.gov/resource/xubh-q36u.json?zip_code=ZIPCODE";

    angular
        .module("HospitalCompareApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $http, $routeParams, $location, UserService){
        $scope.zipcode = "02176";

        function init(){
            var zipcode = $routeParams.id;
            if(zipcode){
                fetchHospitalByZip(zipcode);
            }
        }
        init();

        function fetchHospitalByZip(zipcode){
            UserService.findHospitalByZipCode(zipcode, renderHospitals)
        }

        function renderHospitals(response){
            $scope.data = response;
        }
    }*/
})();