/**
 * Created by akash on 3/25/16.
 */
"use strict";

module.exports = function(){
    var users = require("./user.mock.json");
    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        createUser: createUser,
        deleteUser: deleteUser,
        updateUser: updateUser
    };
    return api;

    function findUserByCredentials(credentials){
        for(var i=0; i<users.length; i++){
            if(users[i].username == credentials.username){
                if(users[i].password == credentials.password){
                    return users[i];
                }
            }
        }
        return null;
    }

    function findUserByUsername(username){
        for(var i=0; i<users.length; i++){
            if(users[i].username == username){
                return users[i];
            }
        }
        return null;
    }

    function findUserById(userId){
        for(var i=0; i<users.length; i++){
            if(users[i]._id == userId){
                return users[i];
            }
        }
        return null;
    }

    function createUser(user){
        users[users.length] = user;
        return user;
    }

    function deleteUser(userId){
        for(var i=0; i<users.length; i++){
            if(users[i]._id == userId){
                users.splice(i, 1);
            }
        }
        return users;
    }

    function updateUser(userId, user){
        for(var i=0; i<users.length; i++){
            if(users[i]._id == userId){
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                users[i].password = user.password;
                users[i].roles = user.roles;
                users[i].username = user.username;
                users[i].email = user.email;
            }
        }
        return user;
    }
};