/**
 * Created by akash on 4/17/16.
 */
"use strict";
(function(){
    angular
        .module("MedicalTourismApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location){
        var vm = this;

        function init(){
            var usr = UserService.getCurrentUser();
            vm.changePassword = false;
            if(usr) {
                UserService
                    .findUserById(usr._id)
                    .then(
                        function(response){
                            vm.currentUser = response.data;
                        },
                        function(err){
                            console.log(err);
                        }
                    );
            } else {
                $location.url("/home");
            }
        }
        init();

        vm.updateUser = updateUser;

        function updateUser(user){
            if(!vm.changePassword){
                delete user.password;
            }
            UserService
                .updateUser(user._id, user)
                .then(
                    function(response){
                        var updatedUser = response.data;
                        if(updatedUser){
                            vm.message = "Update Successfully";
                            UserService
                                .setCurrentUser(updatedUser);
                            init();
                        } else {
                            vm.message = "Update failed";
                        }
                    },
                    function(err){
                        console.log("err");
                    }
                );
        }
    }
})();