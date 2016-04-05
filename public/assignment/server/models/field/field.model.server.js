/**
 * Created by akash on 3/31/16.
 */
"use strict";
var q = require("q");
module.exports = function(db, mongoose, Form) {

    /*var FormSchema = require("./models/form/form.schema.server.js")(mongoose);

    var Form = mongoose.model("Form", FormSchema);*/

    var api = {
        createField: createField,
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldById: findFieldById,
        updateFieldById: updateFieldById,
        sortField: sortField,
        deleteFieldById: deleteFieldById,
        updateAllFieldsInForm: updateAllFieldsInForm
    };

    return api;

    function createField(formId, field){
        return Form.findById(formId)
            .then(
                function(form){
                    form.fields.push(field);
                    return form.save();
                }
            );
    }

    function findAllFieldsForForm(formId){
        return Form
            .findById(formId)
            .then(function(form){
                return form.fields;
            })
    }

    function findFieldById(formId, fieldId){
        return Form
            .findById(formId)
            .then(function(form){
                return form.fields.id(fieldId);
            });
    }

    function updateFieldById(formId, fieldObj){
        return Form
            .findById(formId)
            .then(function(form){
                var field = form.fields.id(fieldObj._id);
                field.label = fieldObj.label;
                field.type = fieldObj.type;
                field.placeholder = fieldObj.placeholder;
                field.options = fieldObj.options;

                return form.save();
            });
    }

    function deleteFieldById(formId, fieldId){
        return Form
            .findFormById(formId)
            .then(function(form){
                form.fields.id(fieldId).remove();
                return form.save();
            });
    }

    function sortField(formId, startIndex, endIndex){
        return Form
            .findFormById(formId)
            .then(
                function(form){
                    form.fields.splice(endIndex, 0, form.fields.splice(startIndex, 1)[0]);
                    form.makrModified("fields"); // notify mongoose 'fields' feild changed
                    form.save();
                });
    }

    function updateAllFieldsInForm(formId, fields){
        return Form.findById(formId).then(
            function(form){
                form.fields = fields;
                return form.save();
            }
        )
    }
};