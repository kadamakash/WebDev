/**
 * Created by akash on 3/17/16.
 */
'use strict';
module.exports = function (app, formModel) {
    app.get("/api/assignment/user/:userId/form", getAllFormsByUserId);
    app.get("/api/assignment/form/:formId", getFormById);
    app.put("/api/assignment/form/:formId",updateFormById);
    app.post("/api/assignment/user/:userId/form",createFormForUser);
    app.delete("/api/assignment/form/:formId",deleteFormById);

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        formModel
            .createFormForUser(userId, form)
            .then(function(form){
                res.json(form);
            }, function(err){
                res.status(400).send(err);
            });
    }

    function getAllFormsByUserId(req, res) {
        var userId = req.params.userId;
        formModel
            .findAllFormsForUser(userId)
            .then(
                function(forms){
                    res.json(fomrs);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function getFormById(req, res) {
        var formId = req.params.formId;
        formModel
            .findFormById(formId)
            .then(
                function(form){
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var newForm = req.body;
        /*var form = model.updateFormById(formId,newForm);
        if(form) {
            res.json(form);
            return;
        }
        res.json({message: "Form not found"});*/

        formModel
            .updateFormById(formId, newForm)
            .then(
                function(form){
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function deleteFormById (req, res) {
        var formId = req.params.formId;
        formModel
            .deleteFormById(formId)
            .then(
                function(form){
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

};