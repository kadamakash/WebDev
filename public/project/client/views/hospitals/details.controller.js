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

        vm.selectReview = selectReview;
        vm.unselectReview = unselectReview;
        vm.deleteReview = deleteReview;
        vm.updateReview = updateReview;

        vm.bookmark = bookmark;
        vm.unbookmark = unbookmark;
        vm.viewingUser = UserService.getCurrentUser();

        vm.selectedReview = null;
        vm.review = null;

        function init(){

            details(provider_id);
            care(provider_id);
            findExpenses(provider_id);
            /*showReviews();*/

            ReviewService
                .findAllReviewsForHospital(provider_id)
                .then(function(res){
                    console.log(res.data);
                    vm.reviews = res.data;
                },
                function(err){
                    console.log(err);
                });
            unselectReview();

            vm.isBookmarked = doesExist(vm.provider_id, vm.viewingUser.bookmarked);
        }
        init();

        function doesExist(id, list){
            var f = false;
            for(var a in list){
                if(list[a].providerId == id){
                    f = true;
                    break;
                }
            }
            return f;
        }

        function bookmark(){
            UserService
                .addBookmarkedHospital(vm.viewingUser._id, {providerId: vm.provider_id, hospitalName: vm.hospital[0].hospital_name})
                .then(
                    function(response){
                        vm.isBookmarked = true;
                    },
                    function(err){
                        console.log(err);
                    }
                )
        }

        function unbookmark(){
            UserService
                .deleteBookmarkedHospital(vm.viewingUser._id, vm.provider_id)
                .then(function(response){
                    vm.isBookmarked = false;
                },
                function(err){
                    console.log(err);
                })
        }

        function unselectReview(){
            vm.review = null;
            vm.selectedReview = null;
        }

        function selectReview(review){
            vm.review = angular.copy(review);
            vm.selectedReview = true;
        }

        function deleteReview(review){
            ReviewService
                .deleteReviewById(review._id)
                .then(function(response){
                    init();
                });
        }

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

        function findExpenses(provide_id){
            HospitalService
                .findHospitalExpenses(provide_id, function(response){
                    vm.expenses = response;
                })
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
                .then(function(response){
                    init();
                });
        }

        function updateReview(review){
            var updatedReview = angular.copy(review);
            delete updatedReview._id;
            ReviewService
                .updateReviewById(review._id, updatedReview)
                .then(function(response){
                    init();
                });
        }

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