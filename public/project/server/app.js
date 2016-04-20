/**
 * Created by akash on 4/15/16.
 */
module.exports = function (app,db, userModel, securityService){


    var reviewModel     = require("./models/hospital/review.model.js")();
    var quoteModel      = require("./models/quote/quote.model.js")();

    var userService     = require("./services/user.service.server.js")(app, userModel, securityService);
    var adminService    = require("./services/admin.service.server.js")(app, userModel);
    var reviewService   = require("./services/review.service.server.js")(app, reviewModel);
    var quoteService    = require("./services/quote.service.server.js")(app, quoteModel, userModel);

};