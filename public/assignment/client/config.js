/**
 * Created by akash on 2/26/16.
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
                templateUrl: "views/home/home.view.html",
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "model"
            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/admin", {
                templateUrl: "client/views/admin/admin.html",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/"
            })
    });

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();
        UserService
            .getCurrentSessionUser()
            .then(function (response) {
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });
        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .getCurrentSessionUser()
            .then(function (response){
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });
        return deferred.promise;
    }
})();