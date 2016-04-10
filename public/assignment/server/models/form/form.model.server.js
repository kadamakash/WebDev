/**
 * Created by akash on 3/17/16.
 */
"use strict";

var q = require("q");
var mongoose = require("mongoose");

module.exports = function(db) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model("Form", FormSchema);

    var api = {
        createForm:createForm,
        findAllForms:findAllForms,
        deleteFormById:deleteFormById,
        updateFormById:updateFormById,
        findFormByTitle:findFormByTitle,
        findFormById: findFormById,
        getMongooseModel: getMongooseModel,
        findAllFormsByUserId: findAllFormsByUserId

    };

    return api;


    function createForm(userId, form) {
        var deferred = q.defer();
        FormModel
            .create(form,
            function(err, doc){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findAllForms(userId) {
        var deferred = q.defer();
        FormModel
            .find(
            function(err, doc){
                if(!err){
                    deferred.resolve(doc);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        FormModel
            .find({title: title}, function(err, doc){
                if(!err){
                    deferred.resolve(doc);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function updateFormById(formId, newForm) {
        var deferred = q.defer();
        FormModel
            .update({_id: formId}, {$set: newForm}, function(err, doc){
                if(!err){
                    deferred.resolve(doc);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function deleteFormById(formId) {
        var deferred = q.defer();
        FormModel
            .remove({_id: formId}, function(err, doc){
                if(!err){
                    deferred.resolve(doc);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function findFormById (formId) {
        var deferred = q.defer();
        FormModel.findById(formId, function(err, doc){
            if(err){
                deferred.reject();
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllFormsByUserId(userId) {
        var deferred = q.defer();
        FormModel.find(
            {userId: userId},
            function(err, doc){
                if(err){
                    deferred.reject();
                }else{
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function getMongooseModel(){
        return FormModel;
    }



};