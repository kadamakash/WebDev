/**
 * Created by akash on 4/9/16.
 */
"use strict";

var passport = require('passport');

module.exports = function(app, userModel){
    var adminAuth = isAdmin;

    app.get     ("/api/assignment/admin/user",    adminAuth,    getAllUsers);
    app.get     ("/api/assignment/admin/user/:userId",    adminAuth,    getUserByUserId);
    app.put     ("/api/assignment/admin/user/:userId",    adminAuth,    updateUser);
    app.post    ("/api/assignment/admin/user",    adminAuth,    createUser);
    app.delete  ("/api/assignment/admin/user/:userId",    adminAuth,    deleteUser);


    function getUserByUserId(req, res){
        var userId = req.params.userId;
        userModel.findUserById(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res){
        var newUser = req.body;
        if(!newUser.roles || !newUser.roles.length > 0)
        newUser.roles = ["student"];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user){
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res){
        var userId = req.params.userId;
        var userData = req.body;
        userModel
            .updateUserById(userId, userData)
            .then(function(doc){
                return userModel.findUserById(userId);
            },
            function(err){
                res.status(400).send(err);
            })
            .then(
                function(user){
                    req.session.currentUser = user;
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res){
        var userId = req.params.userId;
        userModel
            .deleteUserById(userId)
            .then(function(doc){
                res.send(200);
            },
            function(err){
                res.status(400).send(err);
            });
    }

    function getAllUsers(req, res){
        userModel
            .findAllUsers()
            .then(
                function(docs){
                    res.json(docs);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function isAdmin(req, res, next){
        if(!req.isAuthenticated()){
            res.send(401);
        } else {
            var user = req.user;
            if(user.roles.indexOf("admin") > 0){
                next();
            } else{
                res.send(403);
            }
        }
    }
};