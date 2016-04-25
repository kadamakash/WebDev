/**
 * Created by akash on 4/15/16.
 */

"use strict";

var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel, securityService){

    var auth = authorized;
    var passport = securityService.getPassport();

    app.post    ("/api/project/login", passport.authenticate('project'), login);
    app.get     ("/api/project/loggedin",   loggedin);
    app.post    ("/api/project/logout",     logout);
    app.post    ("/api/project/register",   createUser);
    app.get     ("/api/project/user/username/:username",     getUserByUsername);
    app.get     ("/api/project/user",   auth, getAllUsers);
    app.put     ("/api/project/user/:userId", auth,  updateUser);
    app.delete  ("/api/project/user/:username",   auth,  deleteUser);
    app.get     ("/api/project/user/:userId", auth,     getUserByUserId);
    app.post    ("/api/project/user/:userId/bookmarked", addBookmarkedHospital);
    app.delete  ("/api/project/user/:userId/bookmarked/:bookmarkedId", deleteBookmarkedHospital);


    function login(req, res){
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res){
        res.send(req.isAuthenticated() && req.user.app === "medicalTourism" ? req.user : '0');
    }

    function logout(req, res){
        req.logOut();
        res.send(200);
    }

    function getUserByUserId(req, res){
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
                .then(
                    function(user){
                        res.json(user);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
    }

    function getUserByUsername(req, res){
        var username = req.params.username;
        userModel
            .findUserByUsername(username)
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
        console.log(newUser);
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user){
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
                    if(user){
                        req.login(user, function(err){
                            if(err){
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                    console.log(err);
                }
            );
    }

    function updateUser(req, res){
        var userId = req.params.userId;
        var userData = req.body;
        if(userData.password){
            userData.password = bcrypt.hashSync(userData.password);
        }

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
        userModel
            .deleteUserById(userId)
            .then(
                function(stats){
                    res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
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

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function addBookmarkedHospital(req, res){
        var userId = req.params.userId;
        var bookmarkedHospital = req.body;
        userModel
            .addBookmarkedHospital(userId, bookmarkedHospital)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteBookmarkedHospital(req, res){
        var userId = req.params.userId;
        var bookmarkedId = req.params.bookmarkedId;
        userModel
            .deleteBookmarkedHospital(userId, bookmarkedId)
            .then(
                function(stats){
                    res.send(stats);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
};