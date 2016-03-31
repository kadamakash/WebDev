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
        /*if (req.query.username) {
            if (req.query.password) {
                getUserByCredentials(req, res);
            }
            else {
                getUserByUsername(req, res);
            }
        }
        else {
            var users = model.findAllUsers();
            res.json(users);
        }*/

        userModel
            .findAllUsers()
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function getUserById(req, res) {
        var id = req.params.id;
        /*var user = model.findUserById(id);
         if(user) {
         res.json(user);
         return;
         }
         res.json({message: "User not found"});*/

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
        /*var credentials = {
         username: username,
         password: password
         };
         var user = model.findUserByCredentials(credentials);
         if(user) {
         res.json(user);
         return;
         }
         res.json({message: "User not found"});*/

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
        /*var user = model.findUserByUsername(username);
        if (user) {
            res.json(user);
            return;
        }
        res.json({message: "User not found"});*/

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
        /*user = model.updateUser(id, user);
        if (user) {
            res.json(user);
            return;
        }
        res.json({message: "User not found"});*/

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
        /*if(model.deleteUser(id)) {
         res.send(200);
         return;
         }
         res.json ({message: "User not found"});
         }*/
        userModel
            .deleteUser(id)
            .then(
                function (doc) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};
