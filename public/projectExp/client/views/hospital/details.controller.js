/**
 * Created by akash on 3/11/16.
 */
"use strict";

(function(){
    angular
        .module("HospitalCompareApp")
        .controller("DetailController", detailController);

    function detailController($scope, $routeParams, HospitalService){
        $scope.provider_id = $routeParams.provider_id;

        HospitalService.findHospitalDetailsById($scope.provider_id,
            function(response){
                $scope.hospital = response;
            }
        )
    }

    function addHospitalToFavourites(){
        var user = UserService.getCurrentUser();
        user.favourites.push(provider_id);
        UserService.updateUser(user._id, user, addHospitalToFavouriteCallback);
    }

    function addHospitalToFavouritesCallback(user){
        console.log(user.favourites);
    }
})();