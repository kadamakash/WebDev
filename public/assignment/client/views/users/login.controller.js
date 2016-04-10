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

        function login(user) {
            if(!(user && user.username && user.password)){
                vm.message = "Please provide username and password to login.";
            }else{
                UserService
                    .login({
                        username: user.username,
                        password:user.password
                    })
                    .then(function(response){
                        var currentUser = response.data;
                        if (currentUser) {
                            UserService.setCurrentUser(currentUser);
                            $location.url("/profile");
                        }else{
                            vm.message = "Invalid username/password";
                        }
                    });
            }
        }

    }
})();

