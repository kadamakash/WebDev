module.exports = function (app, db, mongoose) {


    var FormSchema = require("./models/form/form.schema.server.js")(mongoose);
    var Form = mongoose.model("Form", FormSchema);

    var FieldSchema = require("./models/field/field.schema.server.js")(mongoose);
    var Field = mongoose.model("Field", FieldSchema);

    var UserSchema = require("./models/user/user.schema.server.js")(mongoose);
    var User = mongoose.model("User", UserSchema);

    var formModel = require("./models/form/form.model.server.js")(db, mongoose, Form);
    var fieldModel = require("./models/field/field.model.server.js")(db, mongoose, Form);
    var userModel = require("./models/user/user.model.server.js")(db, mongoose, User);

    var formService = require("./services/form.service.server.js")(app, formModel);
    var userService = require("./services/user.service.server.js")(app, userModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel, fieldModel);
    var adminService = require("./services/admin.service.server.js")(app, userModel);
};