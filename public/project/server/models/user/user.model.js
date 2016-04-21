/**
 * Created by akash on 4/15/16.
 */
"use strict";

var q = require("q");
var mongoose = require("mongoose");

module.exports = function(db) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model("Users", UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        deleteUserById: deleteUserById,
        findAllUsers: findAllUsers,
        updateUserById: updateUserById,
        addBookmarkedHospital: addBookmarkedHospital,
        deleteBookmarkedHospital: deleteBookmarkedHospital
    };
    return api;

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        UserModel.findOne(
            {username: credentials.username, password: credentials.password},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function createUser(user){
        var deferred = q.defer();
        UserModel.create(user, function(err, doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUserById(userId, user){
        delete user._id;
        var deferred = q.defer();
        UserModel.update( {_id: userId},
            {$set: user}, function(err, stats){
                if(err){
                    deferred.reject();
                } else {
                    deferred.resolve(stats);
                }
            });
        return deferred.promise;
    }

    function findUserById(userId){
        var deferred = q.defer();
        UserModel.findById(userId, function(err, doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username){
        var deferred = q.defer();
        UserModel.findOne(
            {username: username},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function deleteUserById(userId){
        var deferred = q.defer();
        UserModel.remove(
            {_id: userId},
            function(err, stats){
                if(err){
                    deferred.reject(err);
                } else {
                    deferred.resolve(stats);
                }
            }
        );
        return deferred.promise;
    }

    function findAllUsers(){
        var deferred = q.defer();
        UserModel.find(
            function(err, docs){
                if(err){
                    deferred.reject();
                } else {
                    deferred.resolve(docs);
                }
            }
        );
        return deferred.promise;
    }

    function addBookmarkedHospital(userId, bookmarkedHospital){
        var deferred = q.defer();
        UserModel
            .findById(
                userId,
                function(err, doc){
                    if(err){
                        deferred.reject(err);
                    } else {
                        doc.bookmarked.push(bookmarkedHospital);
                        deferred.resolve(doc.save());
                    }
                }
            );
        return deferred.promise;
    }

    function deleteBookmarkedHospital(userId, bookmarkedId){
        var deferred = q.defer();
        UserModel
            .findByIdAndUpdate(
                {_id: userId},
                {$pull: {bookmarked: {providerId: bookmarkedId}}},
                function(err, stats){
                    if(err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(stats);
                    }
                }
            );
        return deferred.promise;
    }

};
