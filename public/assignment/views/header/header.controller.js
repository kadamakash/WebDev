/**
 * Created by akash on 2/26/16.
 */
(function () {
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController)

    function HeaderController($scope, $location, $rootScope) {

        $scope.$location = $location;


        $scope.logout = function () {
            $rootScope.user = null;
            $location.path("/home");
        };
    }


})();