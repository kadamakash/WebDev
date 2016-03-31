/**
 * Created by akash on 3/30/16.
 */
"use strict";
module.exports = function(mongoose){

    var FieldSchema = require("./../field/field.schema.server.js")();

    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        fields: [FieldSchema],
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now}
    }, {collection: 'form'});
    return FormSchema;
};