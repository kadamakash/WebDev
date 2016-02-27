/**
 * Created by akash on 2/26/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainCotroller);
    function MainCOntroller($scope, $location){
        $scope.$location = $location
    }
})();