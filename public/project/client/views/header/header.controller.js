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
            $location.path("/home");
            UserService.setCurrentUser(null);
        }
    }

})();