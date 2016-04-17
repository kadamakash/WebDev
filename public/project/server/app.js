/**
 * Created by akash on 4/15/16.
 */
module.exports = function (app,db, mongoose){

    var userModel = require("./models/user/user.model.js")();
    var userService = require("./services/user.service.server.js")(app, userModel);

};