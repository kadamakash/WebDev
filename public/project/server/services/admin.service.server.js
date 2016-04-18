/**
 * Created by akash on 4/17/16.
 */
"use strict";
var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel){

    var adminAuth = isAdmin;

    app.get("/api/project/admin/user/:userId", adminAuth, getUserByUserId);
    app.get("/api/project/admin/user/", adminAuth, getAllUsers);
    app.post("/api/project/admin/user/:userId", adminAuth, createUser);
    app.put("/api/project/admin/user/:userId", adminAuth, updateUser);
    app.delete("/api/project/admin/user/:userId", adminAuth, deleteUser);

    function getUserByUserId(Req, res){
        var userId = req.params.userId;
        userModel
            .findUserByUserId(userId)
            .then(
                function(doc){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getAllUsers(req, res){
        userModel
            .findAllUsers()
            .then(function(docs){
                res.json(docs);
            },
            function(err){
                res.status(400).send(err);
            });
    }

    function createUser(req, res){
        var newUser = req.body;
        if(!newUser.roles || !newUser.roles.length > 0)
            newUser.roles = ["student"];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
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
        userData.password = bcrypt.hashSync(userData.password);
        userModel
            .updateUserById(userId, userData)
            .then(
                function(stats){
                    return userModel.findUserById(userId);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
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
        userModel.deleteUserById(userId)
            .then(
                function(stats){
                    res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function isAdmin (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            var user = req.user;
            console.log(user);
            if (user.admin) {
                next();
            } else {
                res.send(403);
            }
        }
    }
};