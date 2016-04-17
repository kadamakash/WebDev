/**
 * Created by akash on 3/4/16.
 */
"use strict";
(function(){
    angular
        .module("HospitalCompareApp")
        .config(function($routeProvider){

            $routeProvider
                .when("/", {
                    redirectTo: "/home"
                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController",
                    controllerAs: "model",
                    resolve: {
                        getLoggedIn : getLoggedIn
                    }
                })
                .when("/register", {
                    templateUrl: "views/users/register/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
                .when("/hospital", {
                    templateUrl: "views/hospital/hospital.view.html",
                    controller: "SearchController",
                    controllerAs: "model"
                })
                .when("/hospital/:zipcode", {
                    templateUrl: "views/hospital/hospital.view.html",
                    controller: "SearchController",
                    controllerAs: "model"
                })
                .when("/details/:provider_id", {
                    templateUrl: "views/hospital/details.view.html",
                    controller: "DetailController",
                    controllerAs: "model",
                    resolve: {
                        getLoggedIn : getLoggedIn
                    }
                })
                .when("/login", {
                    templateUrl: "views/users/login/login.view.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn : checkLoggedIn
                    }
                })
                .when("/admin", {
                    templateUrl: "client/views/admin/admin.view.html",
                    controller: "AdminController",
                    controllerAs: "model"
                })
                .when("/review", {
                    templateUrl: "views/review/review.view.html",
                    controller: "ReviewController",
                    controllerAs: "model"
                })
                .otherwise({
                    redirectTo: "/"
                })
        });

    function checkLoggedIn(UserService, $location, $q){
        var deferred = $q.defer();
        UserService.getCurrentSessionUser()
            .then(function (response){
                var currentUser = response.data;
                if(currentUser){
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else{
                    deferred.reject();
                    $location.url("/home");
                }
            });
        return deferred.promise;
    }

    function getLoggedIn(UserService, $q){
        var deferred = $q.defer();
        UserService
            .getCurrentSessionUser()
            .then(function(response){
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });
        return deferred.promise;
    }

})();