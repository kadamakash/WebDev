/**
 * Created by akash on 3/25/16.
 */
"use strict";

module.exports = function(app, model, uuid){
    app.get("/api/projectExp/user", getAllUsers);
    app.get("/api/projectExp/user/:id", getUserById);
    app.get("/api/projectExp/user?username=username", getUserByUsername);
    app.get("/api/projectExp/user?username=alice&password=wonderland", getUserByCredentials);
    app.put("/api/projectExp/user/:id", updateUserById);
    app.post("/api/projectExp/user", createUser);
    app.delete("/api/projectExp/user/:id", deleteUserById);
    app.get("/api/projectExp/loggedin", loggedin);
    app.post("/api/projectExp/logout", logout);

    function getAllUsers(req, res){
        if(req.query.username){
            if(req.query.password){
                getUserByCredentials(req, res);
            }
            else{
                getUserByUsername(req, res);
            }
        }
        else{
            var users = model.findAllUsers();
            res.json(users);
        }
    }

    function getUserById(req, res){
        var id = req.params.id;
        console.log(req.params);
        var user = model.findUserById(id);
        if(user){
            res.json(user);
            return;
        }
        res.json({message: "No User found"});
    }

    function getUserByUsername(req, res){
        var username = req.query.username;
        console.log(username);
        var user = model.findUserByUsername(username);
        if(user){
            res.json(user);
            return;
        }
        res.json({message: "No User Found"});
    }

    function getUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;
        var credentials = {
            username: username,
            password: password
        };

        var user = model.findUserByCredentials(credentials);
        if(user){
            res.json(user);
            return;
        }
        res.json({message: "No User Found"});
    }

    function updateUserById(req, res){
        var id = req.params.id;
        var user = req.body;
        user = model.updateUser(id, user);
        if(user){
            res.json(user);
            return;
        }
        res.json({message: "No User Found"});

    }

    function createUser(res, req){
        var user = req.body;
        user._id=uuid.v4();
        model.createUser(user);
        res.send(user);
    }

    function deleteUserById(req, res){
        var id = req.params.id;
        if(model.deleteUser(id)){
            res.send(200);
            return;
        }
        res.json ({message: "No User Found"});
    }

    function loggedin(req, res){
        res.json(req.session.newUser);
    }

    function logout(req, res){
        req.session.destroy();
        res.send(200);
    }
};