/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($location, UserService, $rootScope) {

        var vm = this;
        this.login = login;
        this.$location = $location;


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
                vm.loginFailed = "Invalid username and password combination"
            }
        }
    }
})();

