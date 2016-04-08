/**
 * Created by akash on 3/17/16.
 */
'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.get("/api/assignment/user/:id", getUserById);

   /* app.get("/api/assignment/user?username=username&password=password", getUserByCredentials);*/


    var auth = authorized;
    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.post('/api/assignment/logout', logout);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/register", register);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done){
        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err){
                    if(err) {return done(err);}
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

    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done){
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    delete user.password;
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function loggedin(req, res){
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res){
        req.logOut();
        res.send(200);
    }

    function login(req, res){
        var user = req.user;
        delete user.password;
        res.json(user);
    }

    function register (req, res){
        var user = req.body;
        userModel
            .findUserByUsername(user.username)
            .then(
                function(user) {
                    if (user) {
                        res.json(null);
                    } else {
                        user.password = bcrypt.hashSync(user.password);
                        return userModel.createUser(user);
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
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;

        /*user._id=uuid.v4();
         model.createUser(user);
         res.send(user);*/

        user = userModel.createUser(user)
            // handle model promise
            .then(
                //login user if promise resolved
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(user);
                },
                //send error if promise rejected
                function (err) {
                    res.status(400).send(err);

                }
            );
    }

    function getAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(
                function(doc){
                    req.session.newUser = doc;
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function getUserById(req, res) {
        var id = req.params.id;
        // use model to find user by id
        userModel
            .findUserById(userId)
            .then(
                //return user if promise resolved
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var credentials = req.body;

        var user = userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );


    }

    function getUserByUsername(req, res) {
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

    function updateUserById(req, res) {
        var id = req.params.id;
        var user = req.body;

        userModel
            .updateUser(id, user)
            .then(
                function(doc){
                    res.json(doc);
                },
                function (err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        var id = req.params.id;

        userModel
            .deleteUser(id)
            .then(
                function (doc) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }


};
