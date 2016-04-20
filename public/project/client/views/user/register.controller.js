/**
 * Created by akash on 4/17/16.
 */
"use strict";
(function(){
    angular
        .module("MedicalTourismApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location){
        var vm = this;

        function init(){

        }
        init();

        vm.register = register;

        function register(user){
            console.log("Inside Register");
            vm.message = null;
            if(!user){
                vm.message = "Please fill all the required fields";
                return;
            }
            if(!user.username){
                vm.message = "Please enter a Username";
                return;
            }
            if (!user.password || !user.vpassword) {
                vm.message = "Please provide a password";
                return;
            }
            if (user.password != user.vpassword) {
                vm.message = "Passwords must match";
                return;
            }

            UserService
                .createUser(user)
                .then(
                    function(response){
                        var currentUser = response.data;
                        console.log(currentUser);
                        if(currentUser){
                            UserService
                                .setCurrentUser(currentUser);
                            $location.url("/profile");
                        }else{
                            vm.message = "Username already exists";
                        }
                    },
                    function(err){
                        console.log(err);
                    }
                );

        }

        /*function isDuplicateUsername(username){
            UserService
                .findUserByUsername(username)
                .then(
                    function(response){
                        var user = response.data;
                        if(user)
                            return true;
                        else
                            return false;
                    },
                    function(err){
                        console.log(err);
                        return false;
                    }
                );
        }*/
    }
})();