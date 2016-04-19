/**
 * Created by akash on 4/15/16.
 */
module.exports = function (app,db, mongoose){

    var userModel       = require("./models/user/user.model.js")();
    var reviewModel     = require("./models/hospital/review.model.js")();

    var userService     = require("./services/user.service.server.js")(app, userModel);
    var adminService    = require("./services/admin.service.server.js")(app, userModel);
    var reviewService   = require("./services/review.service.server.js")(app, reviewModel);

};