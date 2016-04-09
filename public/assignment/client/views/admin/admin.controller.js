/**
 * Created by akash on 4/8/16.
 */
'use strict';
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService){
        var vm = this;

        vm.remove = remove;
        vm.update = update;
        vm.add = add;
        vm.select = select;

        function init(){
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function handleSuccess(response){
            vm.users = response.data;
        }

        function handleError(error){
            vm.error = error;
        }

        function remove(user){
            UserService
                .deleteUserById(user._id)
                .then(handleSuccess, handleError);
        }

        function update(user){
            UserService
                .updateUser(user._id, user)
                .then(handleSuccess, handleError);
        }

        function add(user){
            UserService
                .createUser(user)
                .then(handleSuccess, handleError);
        }

        function select(user)
        {
            vm.user = angular.copy(user);
        }

    }
})();