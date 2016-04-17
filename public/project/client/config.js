/**
 * Created by akash on 4/15/16.
 */
"use strict";
(function(){
    angular
        .module("MedicalTourismApp")
        .config(function($routeProvider){

            $routeProvider
                .when("/", {
                    redirectTo: "/home"
                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController",
                    controllerAs: "model",
                    resolve:{
                        getLoggedIn: getLoggedIn
                    }
                })
                .when("/register", {
                    templateUrl: "views/user/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
                .when("/login", {
                    templateUrl: "views/user/login.view.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
                .when("/profile", {
                    templateUrl: "views/user/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .otherwise({
                    redirectTo: "/"
                });

            function checkLoggedIn(UserService, $q, $location) {
                var deferred = $q.defer();

                UserService
                    .getLoggedinUser()
                    .success(function(user) {
                        if(user !== '0') {
                            UserService.setCurrentUser(user);
                            deferred.resolve();
                        } else {
                            deferred.reject();
                            $location.url("/home");
                        }
                    });
                return deferred.promise;
            }

            function getLoggedIn(UserService, $q){
                var deferred = $q.defer();

                UserService
                    .getLoggedinUser()
                    .success(function(user){
                        if(user !== '0'){
                            UserService.setCurrentUser(user);
                        }
                        deferred.resolve();
                    });
                return deferred.promise;
            }

        })
})();