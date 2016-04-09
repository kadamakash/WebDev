/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService, $rootScope) {

        var vm = this;
        vm.logout = logout;

        function logout() {
           UserService
               .logout()
               .then(function(response){
                   $rootScope.currentUser = null;
                   $location.url("/login");
               },
               function(err){
                   vm.error = err;
               });
        }
    }

})();