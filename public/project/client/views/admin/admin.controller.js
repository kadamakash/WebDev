/**
 * Created by akash on 4/17/16.
 */
"use strict";

(function(){
    angular
        .module("MedicalTourismApp")
        .controller("AdminController", AdminController);

    function AdminController(AdminService, $filter){

        var vm = this;
        var orderBy = $filter('orderBy');
        vm.predicate = 'username';
        vm.reverse = false;
        vm.user = null;
        vm.selectedUser = null;

        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.selectUser = selectUser;
        vm.unselectUser = unselectUser;
        vm.toggleSort = toggleSort;
        vm.deleteUser = deleteUser;

        function init(){
            AdminService
                .findAllUsers()
                .then(
                    function(response){
                        vm.users = response.data;
                        refreshSort();
                    },
                    function(err){
                        console.log(err);
                    }
                );
            unselectUser();
        }
        init();

        function refreshSort(){
            vm.users = orderBy(vm.users, vm.predicate, vm.reverse);
        }

        function toggleSort(predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
            vm.users = orderBy(vm.users, vm.predicate, vm.reverse);
        }

        function selectUser(user){
            vm.user = angular.copy(user);
            vm.selectedUser = true;
        }

        function unselectUser(){
            vm.user = null;
            vm.selectedUser = null;
        }

        function updateUser(user){
            if(user && user.username && user.password){
                var updatedUser = angular.copy(user);
                delete updatedUser._id;
                AdminService
                    .updateUser(user._id, updatedUser)
                    .then(function(response){
                        init();
                    });
            } else {
                vm.message = "Please provide valid user credentials";
            }
        }

        function addUser(user){
            if(user && user.username && user.password){
                AdminService
                    .createUser(user)
                    .then(function(response){
                        init();
                    });
            } else {
                vm.message = "Please provide valid user credentials";
            }
        }

        function deleteUser(user){
            AdminService
                .deleteUserById(user._id)
                .then(function(response){
                    init();
                });
        }



    }
})();