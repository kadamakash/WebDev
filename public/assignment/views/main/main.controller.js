/**
 * Created by akash on 2/26/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);
    function MainController($scope){
        $scope.$location = "MainController"
    }
})();