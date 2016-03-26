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
                    controller: "HomeController"
                })
                .when("/register", {
                    templateUrl: "views/users/register/register.view.html",
                    controller: "RegisterController"
                })
                .when("/hospital", {
                    templateUrl: "views/hospital/hospital.view.html",
                    controller: "SearchController"
                })
                .when("/hospital/:zipcode", {
                    templateUrl: "views/hospital/hospital.view.html",
                    controller: "SearchController"
                })
                .when("/details/:provider_id", {
                    templateUrl: "views/hospital/details.view.html",
                    controller: "DetailController"
                })
                .when("/login", {
                    templateUrl: "views/users/login/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "client/views/admin/admin.view.html"
                })
                .when("/review", {
                    templateUrl: "views/review/review.view.html",
                    controller: "ReviewController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();