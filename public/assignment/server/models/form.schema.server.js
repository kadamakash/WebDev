/**
 * Created by akash on 3/30/16.
 */
"use strict";
module.exports = function(mongoose){
    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        fields: [String],
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now}
    }, {collection: 'form'});
    return FormSchema;
};