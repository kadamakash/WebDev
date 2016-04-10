/**
 * Created by akash on 4/8/16.
 */
'use strict';
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(AdminService, $filter){
        var vm = this;

        var orderBy = $filter('orderBy');
        vm.predicate = 'username';
        vm.reverse = false;

        function init(){
            AdminService
                .findAllUsers()
                .then(
                    function(response){
                        vm.users = response.data;
                        refreshSort();
                        console.log(vm.users);
                    },
                    function(err){
                        console.log(err);
                    }
                );
            unselectedUser();
        }
        init();

        vm.user = null;
        vm.selectedUser = null;

        vm.remove = remove;
        vm.update = update;
        vm.add = add;
        vm.select = select;

        vm.unselectedUser = unselectedUser;
        vm.toggleSort = toggleSort;

        function toggleSort(predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
            vm.users = orderBy(vm.users, vm.pedicate, vm.reverse);
        }

        function refreshSort(){
            vm.users = orderBy(vm.users, vm.predicate, vm.reverse);
        }

        function unselectedUser(user){
            vm.user = null;
            vm.selectedUser = null;
        }

        function remove(user){
            AdminService
                .deleteUserById(user._id)
                .then(function(response){
                    init();
                });
        }

        function update(user){
            if(user && user.username && user.password){
                var updatedUser = angular.copy(user);
                delete updatedUser._id;
                if(typeof user.roles == "string") {
                    updatedUser.roles = user.roles.split(",");
                }
                AdminService
                    .updateUser(user._id, updatedUser)
                    .then(function(response){
                        init();
                    });
            }else{
                vm.message = "Enter valid username and password";
            }
        }

        function add(user){
            if(user && user.username && user.password){
                if(user.roles && user.roles.length > 1) {
                    user.roles = user.roles.split(",");
                } else {
                    user.roles = ["student"];
                }
                AdminService
                    .createUser(user)
                    .then(function(response){
                        init();
                    });
            }else{
                vm.message = "Enter valid username and password";
            }
        }

        function select(user)
        {
            vm.user = angular.copy(user);
            vm.selectedUser = true;
        }

    }
})();