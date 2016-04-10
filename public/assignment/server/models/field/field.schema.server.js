/**
 * Created by akash on 3/30/16.
 */
"use strict";

var mongoose = require('mongoose');
module.exports = function(){
    var FieldSchema = new mongoose.Schema({
        label: String,
        type: {type: String, enum: ['TEXT', 'TEXTAREA', 'EMAIL', 'PASSWORD', 'DROPDOWN', 'DATE', 'RADIOS', 'CHECKBOXES']},
        placeholder: String,
        options: [{label: String, value: String}]
    }, {collection: 'assignment.formmaker.field'});
    return FieldSchema;
};