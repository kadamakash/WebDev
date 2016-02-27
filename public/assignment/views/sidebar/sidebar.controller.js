/**
 * Created by akash on 2/26/16.
 */
(function () {
    'use strict';
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);


    function SidebarController($scope, $location) {
        $scope.$location = $location;

    }

})();