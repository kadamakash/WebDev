/**
 * Created by akash on 3/25/16.
 */
"use strict";

(function(){
    angular
        .module("HospitalCompareApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http){
        var api = {
            addReview: addReview,
            findAllReviewsForUser: findAllReviewsForUser,
            findAllReviewsForHospital: findAllReviewsForHospital,
            deleteReviewById: deleteReviewById,
            updateReviewById: updateReviewById
        };
        return api;

        function addReview(review){
            return $http.post("/api/projectExp/user/"+review.reviewed_by+"/review", review);
        }

        function findAllReviewsForUser(reviewedBy){
            return $http.get("/api/projectExp/user/"+reviewedBy+"/review");
        }

        function findAllReviewsForHospital(provider_id){
            return $http.get("/api/projectExp/hospital/"+provider_id+"/review");
        }

        function deleteReviewById(reviewId){
            return $http.delete("/api/projectExp/review"+reviewId);
        }

        function updateReviewById(reviewId, newReview){
            return $http.put("/api/projectExp/review/"+reviewId, newReview);
        }
    }
})();
