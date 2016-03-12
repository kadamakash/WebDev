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
                templateUrl: "client/views/home/home.view.html"
            })
            .when("/register", {
                templateUrl: "client/views/users/register/register.view.html",
                controller: "RegisterController"
            })
            .when("/hospital", {
                templateUrl: "client/views/hospital/hospital.view.html",
                controller: "SearchController"
            })
            .when("/hospital/:zipcode", {
                templateUrl: "client/views/hospital/hospital.view.html",
                controller: "SearchController"
            })
            .when("/detail/:provider_id", {
                templateUrl: "client/views/hospital/detail.view.html",
                controller: "DetailController"
            })
            .when("/login", {
                templateUrl: "client/views/users/login/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "client/views/users/profile/profile.view.html",
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