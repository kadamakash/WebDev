/**
 * Created by akash on 4/17/16.
 */
"use strict";
(function (){
    angular
        .module("MedicalTourismApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location){
        var vm = this;
        vm.login = login;

        function init(){

        }init();

        function login(user){
            if(!(user && user.username && user.password)){
                vm.message = "Please provide username and password";
            }   else {
                UserService
                    .login({
                        username: user.username,
                        password: user.password
                    })
                    .then(
                        function(response){
                            var currentUser = response.data;
                            if(currentUser){
                                UserService.setCurrentUser(currentUser);
                                $location.url("/home");
                            } else {
                                vm.message = "Invalid username/password";
                            }
                        },
                        function(err){
                            vm.message = "Invalid username/password";
                        }
                    )
            }
        }
    }
})();