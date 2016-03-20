/**
 * Created by akash on 3/17/16.
 */
'use strict';
module.exports = function() {
    var users = require("./user.mock.json");
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
        for (var i in users){
            if(users[i].username == credentials.username && users[i].password == credentials.password){
                return users[i];
            }
        }
        return null;

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
        for(var index=0;index<users.length;index++) {
            if (users[index]._id == userId) {
                return user[index];
            }
        }
        return null;
    }

    function findAllUsers(){
        return users;
    }

    function createUser(user) {
        user._id = (new Date()).getTime();
        users[users.length] = user;
        return user;
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
