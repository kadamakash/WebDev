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
                    controllerAs: "model"
                    /*resolve:{
                        getLoggedIn: getLoggedIn
                    }*/
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
                .when("/search", {
                    templateUrl: "views/hospitals/search.view.html",
                    controller: "SearchController",
                    controllerAs: "model"
                })
                .when("/search/:name", {
                    templateUrl: "views/hospitals/search.view.html",
                    controller: "SearchController",
                    controllerAs: "model"
                })
                .when("/physician", {
                    templateUrl: "views/physician/physician.view.html",
                    controller: "PhysicianController",
                    controllerAs: "model"
                })
                .when("/physician/:city", {
                    templateUrl: "views/physician/physician.view.html",
                    controller: "PhysicianController",
                    controllerAs: "model"
                })
                .when("/details/:provider_id",{
                    templateUrl: "views/hospitals/details.view.html",
                    controller: "DetailsController",
                    controllerAs: "model",
                    resolve:{
                        getLoggedIn: getLoggedIn
                    }
                })
                .when("/admin",{
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    controllerAs: "model",
                    resolve: {
                        /*checkAdmin: checkAdmin*/
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

            function checkAdmin(UserService, $q, $location){
                var deferred = $q.defer();
                UserService
                    .getLoggedinUser()
                    .success(function(user){
                        /*console.log(user);*/
                        if(user !== '0' && user.admin){
                            UserService.setCurrentUser(user);
                            deferred.resolve();
                        } else {
                            deferred.reject();
                            $location.url("/home");
                        }
                    });
                return deferred.promise;
            }

        })
})();