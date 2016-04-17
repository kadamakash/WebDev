/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function(){
    angular
        .module("HospitalCompareApp")
        .controller("HeaderController", headerController);

    function headerController($location, UserService) {
       var vm = this;
        vm.logout = logout;

        function logout() {
           UserService
               .logout()
               .then(function(){
                   UserService.setCurrentUser(null);
                   $location.url("/home");
               })
        }
    }
})();