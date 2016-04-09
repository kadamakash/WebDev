/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .config(function ($routeProvider, $httpProvider) {
            $routeProvider

                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    resolve: {
                        loggedin: checkCurrentUser
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
                        loggedin: checkLoggedIn
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
                        loggedin: checkLoggedIn
                    }
                })
                .when("/admin", {
                    templateUrl: "client/views/admin/admin.html",
                    controller: 'AdminController',
                    resolve: {
                        loggedin: checkAdmin
                    }
                })
                .otherwise({
                    redirectTo: "/home"
                })
        });

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope){
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user){
            $rootScope.errorMessage = null;
            if(user !== '0' && user.roles.indexOf('admin') != -1) {
                $rootScope.currentUser = user;
                defered.resolve();
            }
        });
        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            if (user !== '0')
            {
                $rootScope.cuurentUser = user;
            }
            deferred.resolve();
        });
        return deferred.promise;
    };

    var checkLoggedIn = function ($q, $timeout, $http, $rootScope, $location) {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                $rootScope.currentUser = user;
                deferred.resolve();
            }

            else {
                $rootScope.error = 'You need to log in';
                deferred.reject();
                $location.url('/');
            }
        });
        return deferred.promise;
    };
})();