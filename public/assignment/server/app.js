module.exports = function (app, db) {

    var formModel = require("./models/form/form.model.server.js")(db);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);
    var userModel = require("./models/user/user.model.server.js")(db);
    var userService = require("./services/user.service.server.js")(app, userModel);
    var adminService = require("./services/admin.service.server.js")(app, userModel);

};