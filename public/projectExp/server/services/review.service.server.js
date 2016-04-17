/**
 * Created by akash on 3/25/16.
 */
"use strict";

module.exports = function (app, model, uuid){
    app.get("/api/projectExp/user:userId", findAllReviewsForUser);
    app.put("/api/projectExp/review/:reviewId", updateReviewById);
    app.post("/api/projectExp/user/:userId/review", addReview);
    app.delete("/api/projectExp/review/:reviewId", deleteReviewById);
    app.get("/api/projectExp/hospital/:provider_id/review", findAllReviewsForHospital);

    function findAllReviewsForUser(req, res){
        var userId = req.params.userId;
        var reviews = model.findAllReviewsForUser(userId);
        res.json(reviews);
    }

    function updateReviewById(req, res){
        var id = req.params.reviewId;
        var review = req.body;
        review = model.updateReviewById(id, review);
        if(review){
            res.json(review);
            return;
        }
        res.json({message: "No User found"});
    }

    function addReview(req, res){
        var review = req.body;
        review._id = uuid.v4();
        model.addReview(review);
        res.send(review);
    }

    function deleteReviewById(req, res){
        var id = req.params.reviewId;
        var reviews = model.deleteReviewById(id);
        if(reviews){
            res.send(reviews);
            return;
        }
        res.json({message: "No User found"});
    }

    function findAllReviewsForHospital(req, res){
        var hospitalId = req.params.provider_id;
        var reviews = model.findAllReviewsForHospital(hospitalId);
        res.json(reviews);
    }
};

