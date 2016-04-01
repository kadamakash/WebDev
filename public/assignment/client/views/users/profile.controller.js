/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($location, UserService, $rootScope) {

        var vm = this;
        var currentUser = UserService.getCurrentUser();
        vm.user = currentUser;


        vm.update = update;


        function update(user) {
            var updateUser = {
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastname: user.lastName,
                email: user.email,
                phones: user.phones
            };
            UserService
                .updateUser(user._id, updateUser)
                .then(updateCallback);
        }

        //callback
        function updateCallback(user) {
            console.log(user);
            vm.updateMessage = "Updated successfully"
        }
    }
})();