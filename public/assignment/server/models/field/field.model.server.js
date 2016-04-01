/**
 * Created by akash on 3/31/16.
 */
"use strict";
var q = require("q");
module.exports = function(formModel) {

    var FormModel = formModel.getMongooseModel();

    var api = {
        createField: createField,
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldById: findFieldById,
        updateFieldById: updateFieldById,
        sortField: sortField,
        deleteFieldById: deleteFieldById
    };

    return api;

    function createField(formId, field){
        return FormModel.findById(formId)
            .then(
                function(form){
                    form.fields.push(field);
                    return form.save();
                }
            );
    }

    function findAllFieldsForForm(formId){
        return FormModel.findById(formId).select("fields");
    }

    function findFieldById(formId, fieldId){
        return FormModel
            .findById(formId)
            .then(function(form){
                return form.fields.id(fieldId);
            });
    }

    function updateFieldById(formId, fieldObj){
        return FormModel
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
        return FormModel
            .findFormById(formId)
            .then(function(form){
                form.fields.id(fieldId).remove();
                return form.save();
            });
    }

    function sortField(formId, startIndex, endIndex){
        return FormModel
            .findFormById(formId)
            .then(
                function(form){
                    form.fields.splice(endIndex, 0, form.fields.splice(startIndex, 1)[0]);
                    form.makrModified("fields"); // notify mongoose 'fields' feild changed
                    form.save();
                });
    }
};