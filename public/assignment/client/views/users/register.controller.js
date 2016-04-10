/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService, $rootScope) {

        var vm = this;
        vm.register = register;

        function register(user) {
            console.log("Inside Register");
            vm.message = null;

            if(user = null){
                vm.message = "Please fill in the required fields";
                return;
            }

            if (!user.username){
                vm.message ="Please provide a username";
                return;
            }

            if (!user.password || !user.password2){
                vm.message = "Please enter the password";
                return;
            }

            if(user.password != user.password2){
                vm.message = "Both Passwords must match";
                return;
            }
            UserService
                .createUser(user)
                .then(
                    function(response){
                        var currentUser = response.data;
                        if(currentUser){
                            UserService.setCurrentUser(currentUser);
                            $location.url("/profile");
                        }
                    },
                    function(err){
                        console.log(err);
                    }
                );
        }

        function isDuplicateUsername(username){
            UserService
                .findUserByUsername(username)
                .then(function(response){
                    var user = response.data;
                    if(user){
                        consle.log("duplicate user");
                        return true;
                    }
                    else {
                        return false;
                    }
                });
        }
    }
})();