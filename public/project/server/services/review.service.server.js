/**
 * Created by akash on 4/18/16.
 */
"use strict";
module.exports = function (app, model){

    app.get("/api/project/user/:userId/review", findAllReviewsForUser);
    app.get("/api/project/hospital/:providerId/review", findAllReviewsForHospital);
    app.put("/api/project/review/reviewId", updateReviewById);
    app.post("/api/project/user/:userId/review", addReview);
    app.delete("/api/project/review/:reviewId", deleteReviewById);

    function findAllReviewsForUser(req, res){
        var id = req.params.userId;
        model
            .getReviewForUser(id)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    }

    function findAllReviewsForHospital(req, res){
        var providerId = req.params.providerId;
        model
            .findAllReviewsForHospital(providerId)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    }

    function updateReviewById(req, res){
        var id = req.params.reviewId;
        var review = req.body;
        model
            .updateReviewById(id, review)
            .then(function(doc){
                model
                    .findReviewById(id)
                    .then(function(doc){
                        res.json(doc);
                    }, function(err){
                        res.staus(400).send(err);
                    });
            }, function(err){
                res.status(400).send(err);
            });
    }

    function addReview(req, res){
        var review = req.body;
        model
            .addReview(review)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    }

    function deleteReviewById(req, res){
        var id = req.params.reviewId;
        model
            .deleteReviewById(id)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    }
};