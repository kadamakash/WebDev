/**
 * Created by akash on 4/17/16.
 */
"use strict";

(function(){
    angular
        .module("MedicalTourismApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($routeParams, HospitalService, ReviewService, UserService){
        var vm = this;
        vm.details = details;
        vm.care = care;

        vm.addReview = addReview;
        vm.showReviews = showReviews;
        vm.bookmarkHospital = bookmarkHospital;
        var provider_id = $routeParams.provider_id;
        vm.provider_id = provider_id;

        function init(){

            details(provider_id);
            care(provider_id);
            showReviews();

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

        function showReviews(){
            ReviewService
                .findAllReviewsForHospital(provider_id)
                .then(function(res){
                    console.log(res.data);
                    vm.reviews = res.data;
                });
        }

        function addReview(review){
            var user = UserService.getCurrentUser();
            var newReview = {
                provider_id: provider_id,
                review: review.description,
                rating: review.rating,
                reviewed_by: user._id
            };
            ReviewService
                .addReview(newReview)
                .then(addReviewCallback);
            vm.review = null;
        }
        function addReviewCallback(review){
            console.log(review);
            showReviews();
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

    function bookmarkHospital(){
        var user = UserService.getCurrentUser();
        user.bookmarked.push(provider_id);
        UserService.updateUser(user._id, user, bookmarkHospitalCallback);
    }

    function bookmarkHospitalCallback(user){
        console.log(user.bookmarked);
    }

})();