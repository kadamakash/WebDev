/**
 * Created by akash on 3/28/16.
 */
"use strict";
(function()
{
    angular
        .module("HospitalCompareApp")
        .controller("AdminController", AdminController);

    function AdminController($location, UserService)
    {
        var vm = this;

        var currentUser = UserService.getCurrentUser();
        vm.$location = $location;
        function init(){
            UserService
                .findAllUsers()
                .then(findAllUsersCallback);
        }
        init();

        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.selecteUser = selectUser;
        vm.removeUser = removeUser;

        function addUser(user){
            var newUser = {
                username : user.username,
                roles: "general",
                password: "password"
            };
            UserService
                .createUser(newUser)
                .then(addUserCallback);
        }

        function updateUser(user){
            console.log(user._id);
            UserService
                .updateUser(user._id, user)
                .then(updateUserCallback);
            vm.user = null;
        }

        function selectUser(index){
            vm.selectedUserIndex = index;
            vm.user = {
                _id: vm.users[index]._id,
                username: vm.users[index].username
            };
        }

        function removeUser(index){
            var userId = vm.users[index]._id;
            UserService
                .deleteUserById(userId)
                .then(removeUserCallback);
        }

        function findAllUsersCallback(allUsers) {
            vm.users = allUsers.data;
            console.log(allUsers);

        }

        function addUserCallback(user) {
            console.log(user);
            init();
        }

        function removeUserCallback(user) {
            init();
        }

        function updateUserCallback(user) {
            init();
        }
    }
})();