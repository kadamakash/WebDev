/**
 * Created by akash on 4/17/16.
 */
"use strict";

(function(){
    angular
        .module("MedicalTourismApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, HospitalService){
        var vm = this;
        vm.details = details;
        vm.care = care;


        function init(){
            var provider_id = $routeParams.provider_id;
            vm.provider_id = provider_id;
            details(provider_id);
            care(provider_id);
        }
        init();

        function details(provider_id){
            HospitalService
                .findHospitalById(provider_id,
                    function(response){
                        vm.hospital = response;
                    });
        }

        function care(provider_id){
            HospitalService
                .findCareInfoById(provider_id, function(response){
                    vm.careInfo = response;
                });
        }

        /*function image(provider_id){
            HospitalService
                .findHospitalById(provider_id)
                .then(function(response){
                    HospitalService
                        .findHospitalImage(response.hospital_name, function(response){
                            vm.img = img;
                        })
                })
        }*/
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