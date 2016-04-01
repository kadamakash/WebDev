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
            UserService
                .updateUser(user._id, user)
                .then(updateCallback);
        }

        //callback
        function updateCallback(user) {
            console.log(user);
            vm.updateMessage = "Updated successfully"
        }
    }
})();