/**
 * Created by akash on 4/15/16.
 */
var mongoose = require('mongoose');
module.exports = function(){
    var UserSchema = new mongoose.Schema(
        {
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            email: String,
            address: String,
            admin: {type: Boolean, default: false},
            bookmarked: [String],
            app: {type:String, default:"medicalTourism"}

        }, {collection: "project.user"});
    return UserSchema;
};