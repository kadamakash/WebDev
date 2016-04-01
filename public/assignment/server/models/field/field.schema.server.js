/**
 * Created by akash on 3/30/16.
 */
"use strict";
module.exports = function(mongoose){
    var FieldSchema = mongoose.Schema({
        label: String,
        type: {type: String, enum: ['TEXT', 'EMAIL', 'PASSWORD', 'OPTIONS',
        'DATE', 'RADIOS', 'CHECKBOXES']},
        placeholder: String,
        options: [{label: String, value: String}]
    }, {collection: 'assignment.formmaker.field'});
    return FieldSchema;
};