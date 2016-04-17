/**
 * Created by akash on 3/25/16.
 */
"use strict";
module.exports = function(){
    var reviews = require("./review.mock.json");

    var api = {
        addReview : addReview,
        findAllReviewForUser : findAllReviewsForUser,
        findAllReviewForHospital : findAllReviewForHospital,
        udateReviewById : updateReviewById,
        deleteReviewById : deleteReviewById
    };

    return api;

    function addReview(review){
        reviews[reviews.length] = review;
        console.log(reviews);
        return review;
    }

    function  findAllReviewsForUser(reviewById){
        var userReviews = [];
        for(var i = 0; i<reviews.length; i++){
            if(reviews[i].reviewById == reviewById){
                userReviews.push(reviews[index]);
            }
        }
        return userReviews;
    }

    function findAllReviewForHospital(providerId){
        var hospitalReviews = [];
        for(var i = 0; i<review.length; i++){
            if(reviews[i].provider_id == providerId){
                hospitalReviews.push(reviews[i]);
            }
        }
        return hospitalReviews;
    }

    function updateReviewById(reviewId, updatedReview) {
        for (var i = 0; i < reviews.length; i++) {
            if (reviews[i]._id == reviewId) {
                reviews[i]._id = reviewId;
                updatedReview._id = reviewId;
                reviews[i].provider_id = updatedReview.provider_id;
                reviews[i].feedback = updatedReview.feedback;
                reviews[i].rating = updatedReview.rating;
                break;
            }
        }
        return updatedReview;
    }

    function deleteReviewById(reviewId){
        for(var i = 0; i < reviews.length; i++) {
            if (reviews[i]._id == review_id) {
                reviews.splice(i, 1);
                break;
            }
        }
        return reviews;
    }



};