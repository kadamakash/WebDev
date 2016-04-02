/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function () {

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, UserService) {

        $scope.logout = logout;

        function logout() {
           UserService
               .logout()
               .then(function(){
                   UserService.setCurrentUser(null);
                   $location.url("/home");
               });
        }
    }

})();