/**
 * Created by akash on 3/17/16.
 */
"use strict";

var q = require("q");

module.exports = function(db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model('Form', FormSchema);

    var api = {
        createFormForUser:createFormForUser,
        findAllFormsForUser:findAllFormsForUser,
        deleteFormById:deleteFormById,
        updateFormById:updateFormById,
        findFormByTitle:findFormByTitle,
        findFormById: findFormById,
        getMongooseModel: getMongooseModel

    };

    return api;


    function createFormForUser(userId, form) {
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

    function findAllFormsForUser(userId) {
        var deferred = q.defer();
        FormModel
            .find({userId: userId},
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
            .update({formId: formId}, {$set: newForm}, function(err, doc){
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
            .remove({formId: formId}, function(err, doc){
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
        FormModel
            .findOne({formId: formId}, function(err, doc){
                if(!err){
                    deferred.resolve(doc);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function getMongooseModel(){
        return FormModel;
    }



};