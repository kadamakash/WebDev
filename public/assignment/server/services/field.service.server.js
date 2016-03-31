/**
 * Created by akash on 3/19/16.
 */
'use strict';
module.exports = function (app, formModel) {
    app.get("/api/assignment/form/:formId/field", getAllFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateFieldById);
    app.put("/api/assignment/form/:formId/field/",updateAllFields);
    app.post("/api/assignment/form/:formId/field",createFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteFieldById);

    var fieldModel = require("../models/field/field.model.server.js")(formModel);

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        fieldModel
            .createField(formId, field)
            .then(
                function(form){
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function updateAllFields(req,res) {
        var formId = req.params.formId;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;

        if(startIndex && endIndex){
            fieldModel
                .sortField(formId. startIndex, endIndex)
                .then(
                    function(start){
                        return fieldModel.findAllFieldsForForm(formId);
                    },
                    function(err){
                        res.staus(400).send(err);
                    }
                )
                .then(
                    function(form){
                        res.json(form.fields);
                    },
                    function(err){
                        res.status(400).send(err);
                    });
        }
    }

    function getAllFieldsByFormId(req, res) {
        var formId = req.params.formId;
        fieldModel
            .findAllFieldsForForm(formId)
            .then(
                function(form){
                    res.json(form.fields);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function getFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel
            .findFieldById(formId, fieldId)
            .then(
                function(form){
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function updateFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;
        fieldModel
            .updateFieldById(formId, newField)
            .then(
                function(stat){
                    res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function deleteFieldById (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel
            .deleteFieldById(formId, fieldId)
            .then(
                function(stat){
                    res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

};