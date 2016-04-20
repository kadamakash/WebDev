/**
 * Created by akash on 4/20/16.
 */
"use strict";
module.exports = function(app, quoteModel, userModel){

    app.post("/api/project/quote/userId", addQuote);

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
};