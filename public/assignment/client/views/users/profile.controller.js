/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($scope, $location, UserService, $rootScope) {

        var currentUser = UserService.getCurrentUser();
        $scope.user = currentUser;


        $scope.update = update;


        function update(user) {
            UserService
                .updateUser(user._id, user)
                .then(updateCallback);
        }

        //callback
        function updateCallback(user) {
            console.log(user);
            $scope.updateMessage = "Updated successfully"
        }
    }
})();