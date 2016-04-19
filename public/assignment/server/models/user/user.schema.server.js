/**
 * Created by akash on 3/30/16.
 */
"use strict";
var mongoose = require('mongoose');
module.exports = function(){

    // using mongoose to declare a user schema
    var UserSchema = new mongoose.Schema({     //creates instances of Schemas
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],
        roles: [String],
        app: {type:String, default:"assignment"}
    }, {collection: 'assignment.formmaker.user'});
    return UserSchema;
};