/**
 * Created by akash on 4/20/16.
 */
"use strict";
module.exports = function(app, quoteModel, userModel){

    app.post("/api/project/quote", addQuote);
    app.get("/api/project/response", getQuote);
    app.get("/api/project/quotes", getAllQuotes);
    app.put("/api/project/response/username", updateQuote);

    function addQuote(req, res){
        var id = req.params.userId;
        var quote = req.body;
        quoteModel
            .addQuote(quote)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    }

    function getQuote(req, res){
        var id = req.body;
        quoteModel
            .getQuote(id)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    }

    function getAllQuotes(req, res){
        quoteModel
            .findQuotes()
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    }

    function updateQuote(req, res){
        var id = req.params.username;
        var response = req.body;
        quoteModel
            .updateQuote(id, response)
            .then(function(doc){
                res.json(doc);
            }, function(err){
                res.status(400).send(err);
            });
    }
};