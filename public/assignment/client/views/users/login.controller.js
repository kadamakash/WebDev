/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($scope, $location, UserService, $rootScope) {

        $scope.login = login;
        $scope.$location = $location;


        function login(user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(loginCallback);
        }

        //Callback
        function loginCallback(user) {
            if(user!=null) {
                UserService.setCurrentUser(user.data);
                $location.path('/profile');
            }
            else{
                $scope.loginFailed = "Invalid username and password combination"
            }
        }
    }
})();

