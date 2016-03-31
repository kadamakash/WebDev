module.exports = function (app, uuid, db, mongoose) {
    var formModel = require("./models/form/form.model.server.js")(db, mongoose);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var userModel = require("./models/user/user.model.server.js")(db, mongoose);
    var userService = require("./services/user.service.server.js")(app, userModel);

    var fieldService = require("./services/field.service.server.js")(app, formModel);
};