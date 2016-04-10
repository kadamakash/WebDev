/**
 * Created by akash on 3/30/16.
 */
"use strict";
var mongoose = require('mongoose');
module.exports = function(){

    var FieldSchema = require("./../field/field.schema.server.js")();

    var FormSchema = new mongoose.Schema({
        userId: String,
        title: String,
        fields: [FieldSchema],
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now}
    }, {collection: 'assignment.formmaker.form'});
    return FormSchema;
};