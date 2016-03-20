/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($location, UserService, $scope, $rootScope) {

        $scope.register = register;

        function register(user) {
            UserService
                .createUser(user)
                .then(registerCallback);
        }

        function registerCallback(user) {
            UserService.setCurrentUser(user.data);
            $location.path('/profile');
            console.log(user);
        }
    }
})();