/**
 * Created by akash on 4/20/16.
 */
"use strict";

var q = require("q");
var mongoose = require("mongoose");

module.exports = (function(db){

    var QuoteSchema = require("./quote.schema.server.js")(mongoose);
    var QuoteModel = mongoose.model("Quotes", QuoteSchema);

    var api = {
        addQuote: addQuote
    };
    return api;

    function addQuote(quote){
        var deferred = q.defer();
        QuoteModel.create(quote, function(err, doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
});