/**
 * Created by akash on 4/19/16.
 */
"use strict";
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(assignmentUserModel,projectUserModel) {

    passport.use('assignment',new LocalStrategy(assignmentStrategy));
    passport.use('project',new LocalStrategy(projectStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    var api = {
        getPassport : getPassport

    };
    return api;


    function getPassport() {
        return passport;
    }

    function assignmentStrategy(username, password, done) {
        console.log("In assignmentStrategy");
        assignmentUserModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    console.log("User Found ....",user);
                    if(user && bcrypt.compareSync(password, user.password)) {
                        console.log("User Authenticated For Assignment");
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }


    function projectStrategy(username, password, done) {
        console.log("In projectStrategy");
        projectUserModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user) {
                        console.log("User Found",user);
                        if(user && bcrypt.compareSync(password, user.password)) {
                            console.log("User Authenticated For Project");
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    } else {
                        return done(null, false);
                    }

                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {

        if(user.app === "assignment") {
            assignmentUserModel
                .findUserByUsername(user.username)
                .then(
                    function(user){
                        delete user.password;
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );

        } else if (user.app === "medicalTourism") {
            projectUserModel
                .findUserByUsername(user.username)
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

    }
};