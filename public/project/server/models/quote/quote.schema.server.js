/**
 * Created by akash on 4/15/16.
 */
var mongoose = require('mongoose');
module.exports = function(){
    var QuoteSchema = new mongoose.Schema(
        {
            firstName: String,
            lastName: String,
            gender: String,
            age: Number,
            email: String,
            phone: String,
            address: String,
            city: String,
            state: String,
            country: String,
            message: String,
            userId: String,
            response: String,
            app: {type:String, default:"medicalTourism"}

        }, {collection: "project.quote"});
    return QuoteSchema;
};