/**
 * Created by akash on 4/18/16.
 */
var mongoose = require('mongoose');
module.exports = function(){
    var ReviewSchema = new mongoose.Schema({
        review: String,
        rating: String,
        provider_id: String,
        reviewed_by: String
    }, {collection: 'project.review'});
    return ReviewSchema;
};