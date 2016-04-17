/**
 * Created by akash on 4/15/16.
 */
(function() {
    angular
        .module("MedicalTourismApp")
        .factory("UserService", UserService);

    function UserService ($http, $rootScope){
        var api = {
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            updateUser: updateUser,
            deleteUser: deleteUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserById: findUserById,
            deleteUserById: deleteUserById,
            getLoggedinUser: getLoggedinUser,
            login: login,
            logout: logout
        };
        return api;

        function createUser(user){
            return $http.post("/api/project/register", user);
        }

        function findUserByUsername(username){
            return $http.get("/api/project/user/" +username);
        }

        function findAllUsers(){
            return $http.get("/api/project/user");
        }

        function updateUser(userId){
            return $http.put("/api/project/user/"+userId);
        }

        function deleteUser(userId){
            return $http.delete("/api/project/user/"+userId);
        }

        function setCurrentUser(user){
            $rootScope.currentUser = user;
        }

        function getCurrentUser(){
            return $rootScope.currentUser;
        }

        function findUserById(userId){
            return $http.get("/api/project/user"+userId);
        }

        function deleteUserById(userId){
            return $http.delete("/api/project/user"+userId);
        }

        function getLoggedinUser(){
            return $http.get("/api/project/loggedin");
        }

        function login(credentials){
            return $http.post("/api/project/login", credentials);
        }

        function logout(){
            return $http.post("/api/project/logout");
        }


    }
})();