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
        vm.login = login;
        vm.$location = $location;

        function login(user) {
            if(user)
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(
                    function(response){
                        $rootScope.currentUser = response.data;
                        $location.url("/profile");
                    }
                );
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

