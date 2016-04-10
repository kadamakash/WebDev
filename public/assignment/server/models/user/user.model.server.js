/**
 * Created by akash on 3/17/16.
 */
'use strict';

var q = require("q"); // loading q promise library

module.exports = function(db, mongoose, User) {
    //loading user schema
   /* var UserSchema = require("./user.schema.server.js")(mongoose);

    //creating a user model from schema
    var UserModel = mongoose.model('User', UserSchema);*/

    /* var users = require("./user.mock.json");*/

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser
    };
    return api;

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        User.findOne(
            {
                username: credentials.username,
                password: credentials.password
            },

            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }


    function findUserByUsername(username) {
        var deferred = q.defer();
        User.findOne(username, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function findUserById(userId) {
        var deferred = q.defer();
        User.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        User.find(
            function(err, doc){
                if(err){
                    deferred.resolve(doc);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function createUser(user) {
        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create method
        User.create(user, function (err, doc) {
            console.log(doc);

            if (err) {
                //reject promise if error
                deferred.reject(err);
            } else {
                //resolve promise
                deferred.resolve(doc);
            }
        });
        //return promise
        return deferred.promise;
    }


    function deleteUser(userId) {
        var deferred = q.defer();

        User.remove(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }


    function updateUser(userId, user) {
        var deferred = q.defer();
        User
            .update(
                {_id: userId},
                {$set: user},
                function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }

                });
        return deferred.promise;

    }
};