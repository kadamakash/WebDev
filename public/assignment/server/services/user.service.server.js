/**
 * Created by akash on 3/17/16.
 */
'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, userModel) {

    var auth = authorized;

    app.post("/api/assignment/user", auth, createUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.put("/api/assignment/user/:id", auth, updateUserById);
    app.delete("/api/assignment/user/:id", auth, deleteUserById);
    app.get("/api/assignment/user/:id", auth, getUserById);

   /* app.get("/api/assignment/user?username=username&password=password", getUserByCredentials);*/

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

    function isAdmin(user) {
        return (user.roles.indexOf("admin") > 0)
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
        user.roles = ['student'];

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
        var newUser = req.body;

        if(newUser.roles && newUser.roles.length > 1){
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user == null){
                        return userModel.createUser(newUser)
                            .then(
                                function(){
                                    return userModel.getAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                    } else {
                        return userModel.getAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    function getAllUsers(req, res) {
        if(isAdmin(req.user)) {
            userModel
                .findAllUsers()
                .then(
                    function (doc) {
                        /* req.session.newUser = doc;*/
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }

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
        var newUser = req.body;

        if(!isAdmin(req.user)){
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string"){
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .updateUser(id, newUser)
            .then(
                function(user){
                    return userModel.getAllUsers();
                },
                function (err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.josn(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        if(isAdmin(req.user)) {
            var id = req.params.id;

            userModel
                .deleteUser(id)
                .then(
                    function (doc) {
                        return userModel.getAllUsers();
                    },
                    function (err) {
                        res.status(400).send(err);
                    })
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }


};
