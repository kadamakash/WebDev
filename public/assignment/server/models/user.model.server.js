/**
 * Created by akash on 3/17/16.
 */
'use strict';

var q = require("q"); // loading q promise library

module.exports = function(db, mongoose) {
    //loading user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    //creating a user model from schema
    var UserModel = mongoose.model('User', UserSchema);

   /* var users = require("./user.mock.json");*/

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser:createUser,
        deleteUser:deleteUser,
        updateUser:updateUser
    };
    return api;

    function findUserByCredentials(credentials) {
        /*for (var i in users){
            if(users[i].username == credentials.username && users[i].password == credentials.password){
                return users[i];
            }
        }
        return null;*/

        var deferred = q.defer();
        UserModel.findOne(
            {username: credentials.usernmae,
             password: credentials.password},

            function(err, doc){
                if(err){
                    deferred.reject(err);
                } else{
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        for(var index=0;index<users.length;index++) {
            if(users[index].username == username) {
                return users[index];
            }
        }
        return null;
    }

    function findUserById(userId) {
        /*for(var index=0;index<users.length;index++) {
            if (users[index]._id == userId) {
                return user[index];
            }
        }
        return null;*/

        var deferred = q.defer();
        UserModel.findById(userId, function(err, doc){
            if(err){
                deferred.reject(err);
            } else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers(){
        return users;
    }

    /*function createUser(user) {
        user._id = (new Date()).getTime();
        users[users.length] = user;
        return user;
    }*/

    function createUser(user){
        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create method
        UserModel.create(user, function(err, doc){
            console.log(doc);

            if (err){
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
        for(var index=0;index<users.length;index++) {
            if(users[index]._id == userId) {
                users.remove(index);
            }
        }
        return users;

    }

    function updateUser(userId, user) {
        for(var index=0;index<users.length;index++) {
            if(users[index]._id == userId) {
                users[index].firstName = user.firstName;
                users[index].lastName = user.lastName;
                users[index].password = user.password;
                users[index].roles = user.roles;
                users[index].username = user.username;
                users[index].email = user.email;
            }
        }
        return user;
    }

};
