/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService) {

        var vm = this;
        vm.logout = logout;

        function init(){
            vm.$location = $location;
        }
        init();

        function logout() {
           UserService
               .logout()
               .then(function(response){
                   UserService.setCurrentUser(null);

                   $location.url("/home");
               },
               function(err){
                   console.log(err);
               });
        }
    }

})();