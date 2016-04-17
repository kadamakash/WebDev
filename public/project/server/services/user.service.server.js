/**
 * Created by akash on 4/15/16.
 */

"use strict";

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel){

    var auth = authorized;

    app.post    ("/api/project/login", passport.authenticate('medical-tourism'), login);
    app.get     ("/api/project/loggedin",   loggedin);
    app.post    ("/api/project/logout",     logout);
    app.post    ("/api/project/register",   createUser);
    app.get     ("/api/project/user/:username",     getUserByUsername);
    app.get     ("/api/project/user",   auth, getAllUsers);
    app.put     ("/api/project/user/:userId", auth,  updateUser);
    app.delete  ("/api/project/user/:username",   auth,  deleteUser);
    app.get     ("/api/project/user/:userId", auth,     getUserByUserId);

    passport.use('medical-tourism',  new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done){
        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    if(user && bcrypt.compareSync(password, user.password)){
                        return done(null, user);
                    } else {
                        return done (null, false);
                    }
                },
                function(err){
                    if(err) {return done(err);
                    }
                }
            )
    }

    function serializeUser(user, done){
        done(null, user);
    }

    function deserializeUser(user, done){
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res){
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res){
        res.send(req.isAuthenticated() ? req.user : '0');
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
};