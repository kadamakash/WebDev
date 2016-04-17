/**
 * Created by akash on 3/25/16.
 */
"use strict";
(function(){
    angular
        .module("HospitalCompareApp")
        .controller("ReviewController", ReviewController);

    function ReviewController($scope, $location, UserService, ReviewService){
        var currentUser = UserService.getCurrentUser();
        $scope.$location = $location;
        function init(){
            ReviewService
                .findAllReviewsForUser(currentUser._id)
                .then(findAllReviewsForUserCallback);
        }
        init();
        function findAllReviewsForUserCallback(reviewsCurrentUser){
            $scope.users = reviewsCurrentUser.data;
            console.log(reviewsCurrentUser);
        }

        $scope.addReview = addReview;
        $scope.removeReview = removeReview;
        $scope.selectReview = selectReview;
        $scope.updateReview = updateReview;

        function addReview(review){
            var newReview = {
                provider_id: review.provider_id,
                feedback: review.feedback,
                rating: review.rating,
                reviewed_by: currentUser._id
            };
            ReviewService
                .addReview(newReview)
                .then(addReviewCallback);
        }
        function addReviewCallback(review){
            console.log(review);
            init()
        }

        function removeReview(index){
            var reviewId = $scope.users[index]._id;
            ReviewService
                .deleteReviewById(reviewId)
                .then(removeReviewCallback);
        }
        function removeReviewCallback(review) {
            init();
        }

        function selectReview(index){
            $scope.selectedReviewIndex = index;
            $scope.review = {
                _id: $scope.users[index]._id,
                provider_id: $scope.users[index].provider_id,
                feedback: $scope.users[index].feedback,
                rating: $scope.users[index].rating
            };
        }

        function updateReview(review){
            console.log(review._id);
            ReviewService
                .updateReviewById(review._id, review)
                .then(updateReviewCallback);
            $scope.review = null;

        }
        function updateReviewCallback(review) {
            init();
        }

    }

})();