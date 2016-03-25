/**
 * Created by akash on 3/4/16.
 */
"use strict";
(function(){
    angular
        .module("HospitalCompareApp")
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
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
            .when("/detail/:provider_id", {
                templateUrl: "views/hospital/detail.view.html",
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
            .otherwise({
                redirectTo: "/home"
            });
    }
})();