/**
 * Created by akash on 3/19/16.
 */
'use strict';
module.exports = function (app, formModel, fieldModel) {
    app.post("/api/assignment/form/:formId/field", createFormField);
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdAndFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFieldIdAndFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldIdAndFormId);
    app.put("/api/assignment/form/:formId/field", updateFields);

    function createFormField (req, res) {
        var field = req.body;
        var formId = req.params.formId;

        fieldModel.createFieldForForm(formId, field)
            .then(
                function(field){
                    res.json(field);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllFieldsForForm(req, res) {
        var formId = req.params.formId;
        fieldModel.findAllFieldsForForm(formId)
            .then(
                function(fields){
                    res.json(fields);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findFieldByFieldIdAndFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        fieldModel.findFieldByFieldIdAndFormId(formId, fieldId)
            .then(
                function(field){
                    res.json(field);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldByFieldIdAndFormId (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        fieldModel.updateFieldByFieldIdAndFormId(formId, fieldId, field)
            .then(
                function(form){
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteFieldByFieldIdAndFormId (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        fieldModel.deleteFieldByFieldIdAndFormId(formId, fieldId)
            .then(
                function(response){
                    res.send(response.result);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateFields (req, res) {
        var formId = req.params.formId;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;

        if(startIndex && endIndex) {
            fieldModel
                .sortFields(formId, startIndex, endIndex)
                .then(
                    function(stat) {
                        res.send(200);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        }
    }


};