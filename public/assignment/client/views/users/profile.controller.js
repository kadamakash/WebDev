/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController(UserService) {

        var vm = this;
        /*var currentUser = UserService.getCurrentUser();
        vm.user = currentUser;*/


        vm.update = update;


        function update(user) {
            UserService
                .updateUser(user._id, user)
                .then(
                    function(response){
                        vm.users = response.data;
                        vm.updateMessage = "Updated successfully"
                    },

                function(err){
                    vm.error = err;
                });
        }

    }
})();