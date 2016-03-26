/**
 * Created by akash on 3/10/16.
 */
"use strict";
(function(){
    angular
        .module("HospitalCompareApp")
        .controller("LoginController", loginController);

    function loginController ($scope,  $location, UserService, $rootScope) {
        $scope.login = login;
        $scope.location = $location;

        function login(user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(loginCallback);
        }

        function loginCallback(user) {
            if(user!=null) {
                UserService.setCurrentUser(user.data);
                $location.path('/profile');
            }
            else {
                $scope.loginFailed = "Login failed. Invalid username or password."
            }

        }


    }
})();