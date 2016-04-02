/**
 * Created by akash on 3/17/16.
 */
'use strict';
module.exports = function (app, userModel) {
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.get("/api/assignment/user?username=username&password=password", getUserByCredentials);
    app.put("/api/assignment/user/:id", updateUserById);
    app.post("/api/assignment/user", createUser);
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);

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
        var user = userModel.findUserById(userId)
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

    function loggedin(req, res) {
        res.json(req.session.newUser);
    }


    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }


};
