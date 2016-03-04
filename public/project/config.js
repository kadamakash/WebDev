/**
 * Created by akash on 3/4/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider)
        {
            $routeProvider
                .when("/", {
                    redirectTo: "/home"
                })
                .when("/home", {
                    templateUrl: "client/views/home/home.view.html"
                })
                .when("/login", {
                    templateUrl: "client/views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/register", {
                    templateUrl: "client/views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/profile", {
                    templateUrl: "client/views/users/profile.view.html",
                    controller: "ProfileController"
                })

                .when("/admin", {
                    templateUrl: "client/views/admin/admin.html"
                })
                .otherwise({
                    redirectTo: "/"
                })
        });
})();