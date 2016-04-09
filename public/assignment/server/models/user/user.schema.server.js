/**
 * Created by akash on 3/30/16.
 */
"use strict";
module.exports = function(mongoose){

    // using mongoose to declare a user schema
    var UserSchema = mongoose.Schema({     //creates instances of Schemas
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],
        roles: [String]


    }, {collection: 'assignment.formmaker.user'});
    return UserSchema;
};