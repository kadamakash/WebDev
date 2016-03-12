/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function(){
    angular
        .module("HospitalCompareApp")
        .controller("HeaderController", headerController);

    function headerController($location, $scope, UserService) {
        $scope.$location = $location;
        $scope.logout = logout;

        function logout() {
            UserService.setCurrentUser(null);
            $location.path("/home");
        }
    }
})();