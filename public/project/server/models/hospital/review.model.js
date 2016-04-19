/**
 * Created by akash on 4/18/16.
 */
"use strict";
var q = require("q");
var mongoose = require("mongoose");

module.exports = function(db){
    var ReviewSchema = require("./review.schema.server.js")(mongoose);
    var ReviewModel = mongoose.model('HospitalReview', ReviewSchema);

    var api = {
        addReview: addReview,
        findAllReviewsForUser: findAllReviewsForUser,
        findAllReviewsForHospital: findAllReviewsForHospital,
        findReviewById: findReviewById,
        updateReviewById: updateReviewById,
        deleteReviewById: deleteReviewById
    };
    return api;

    function addReview(review){
        var deferred = q.defer();
        ReviewModel
            .create(review, function(err, doc){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findAllReviewsForUser(userId){
        var deferred = q.defer();
        ReviewModel
            .find({reviewed_by: userId}, function(err, doc){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findAllReviewsForHospital(providerId){
        var deferred = q.defer();
        ReviewModel
            .find({provider_id: providerId}, function(err, doc){
                if(err){
                    deferred.reject(err)
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findReviewById(reviewId){
        var deferred = q.defer();
        ReviewModel
            .findOne({_id: reviewId}, function(err, doc){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function updateReviewById(reviewId, newReview){
        var deferred = q.defer();
        ReviewModel
            .update({_id: reviewId}, {$set: newReview}, function(err, doc){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function deleteReviewById(reviewId){
        var deferred = q.defer();
        ReviewModel
            .remove({_id: review_id}, function(err, doc){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
};