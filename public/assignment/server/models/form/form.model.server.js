/**
 * Created by akash on 3/17/16.
 */
"use strict";

var q = require("q");

module.exports = function(db, mongoose, Form) {

   /* var FormSchema = require("./form.schema.server.js")(mongoose);
    var Form = mongoose.model('Form', FormSchema);*/

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
        Form
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
        Form
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
        Form
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
        Form
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
        Form
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
        Form
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
        return Form;
    }



};