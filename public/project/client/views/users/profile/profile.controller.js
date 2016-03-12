/**
 * Created by akash on 3/10/16.
 */
"use strict";
(function(){
    angular
        .module("HospitalCompareApp")
        .controller("ProfileController", profileController);

    function profileController($scope, UserService, $location, $rootscope, HospitalService) {

       var currentUser = UserService.getCUrrentUser();
        $scope.favouriteHospitals = [];
        $scope.user = currentUser;

        $scope.showFavourites = showFavourites;
        $scope.update = update;
        $scope.removeFavourite = removeFavourite;

        function update(user){
            UserService.updateUser(user._id, user, updateCallback);
        }

        function showFavourites() {
            var user = UserService.getCurrentUser();
            $scope.favoriteHospitals = [];
            if(user.favourites.length > 0) {
                for(var index = 0; index<user.favourites.length;index++) {
                    HospitalService.findHospitalDetailsById(user.favourites[index],showFavouritesCallback)
                }
            } else {
                $scope.favoriteHospitals = [];
            }
        }

        function removeFavourite(id) {
            console.log(id);
            var user = UserService.getCurrentUser();
            var index = user.favourites.indexOf(id);
            user.favourites.splice(index,1);
            UserService.updateUser(user._id,user,removeFavouriteCallback);

        }


        function updateCallback(user) {
            console.log(user);
            $scope.updateMessage = "Profile updated successfully."
        }

        function showFavouritesCallback(hospital) {
            $scope.favoriteHospitals.push(hospital.hospital_name);
        }

        function removeFavouriteCallback(user) {
            console.log("remove callback")
            console.log(user.favourites);
            showFavourites();
        }

    }
})();