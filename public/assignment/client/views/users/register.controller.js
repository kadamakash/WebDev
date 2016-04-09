/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($location, UserService, $rootScope) {

        var vm = this;
        vm.register = register;

        function register(user) {
            UserService
                .createUser(user)
                .then(
                    function(response){
                        var user = response.data;
                        if(user != null){
                            $rootScope.currentUser = user;
                            $location.url("/profile");
                        }
                    },
                    function(err){
                        vm.error = err;
                    }
                );
        }

        /*function registerCallback(user) {
            UserService.setCurrentUser(user.data);
            $location.path('/profile');
            console.log(user);
        }*/
    }
})();