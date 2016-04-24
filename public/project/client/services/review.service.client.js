/**
 * Created by akash on 4/18/16.
 */
"use strict";
(function(){
    angular
        .module("MedicalTourismApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http){
        var api = {
            addReview: addReview,
            updateReviewById: updateReviewById,
            deleteReviewById: deleteReviewById,
            findAllReviewsForUser: findAllReviewsForUser,
            findAllReviewsForHospital: findAllReviewsForHospital
        };
        return api;

        function addReview(review){
            return $http.post("/api/project/user/"+review.reviewed_by + "/review", review);
        }

        function updateReviewById(reviewId, newReview){
            return $http.put("/api/project/review/" + reviewId, newReview);
        }

        function deleteReviewById(reviewId){
            return $http.delete("/api/project/review/" + reviewId);
        }

        function findAllReviewsForUser(reviewedBy){
            return $http.get("/api/project/user/"+reviewedBy+ "/review");
        }

        function findAllReviewsForHospital(providerId){
            return $http.get("/api/project/hospital/"+ providerId+ "/review");
        }
    }
})();