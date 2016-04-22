/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .config(function ($routeProvider) {
            $routeProvider

                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    resolve: {
                        getLoggedIn: getLoggedIn
                    }
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
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when("/form/:formId/fields", {
                    templateUrl: "views/forms/fields.view.html",
                    controller: "FieldController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when("/admin", {
                    templateUrl: "client/views/admin/admin.html",
                    controller: 'AdminController',
                    controllerAs: "model",
                    resolve: {
                        loggedin: checkAdmin
                    }
                })
                .otherwise({
                    redirectTo: "/home"
                })
        });

    var checkAdmin = function($q, UserService, $location){
        var deferred = $q.defer();
        UserService
            .getLoggedinUser()
            .success(function(user){
                if(user !== '0' && user.roles.indexOf('admin') != -1)
                {
                    UserService.setCurrentUser(user);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });
        return deferred.promise;
    };

    function getLoggedIn($q,UserService)
    {
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


    var checkLoggedIn = function ($q, UserService, $location) {
        var deferred = $q.defer();
        UserService
            .getLoggedinUser()
            .success(function(user){
                if(user !== '0'){
                    UserService.setCurrentUser(user);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });
        return deferred.promise;
    }

})();