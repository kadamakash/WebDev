/**
 * Created by akash on 3/10/16.
 */
(function(){
    angular
        .module("HospitalCompareApp")
        .controller("LoginController", loginController);

    function loginController ($scope, UserService, $location, $rootScope) {
        $scope.login = login;

        function login (user) {
            var user1 = UserService.findUserByCredentials({username: user.username, password: user.password});
            if (user1) {
                $rootScope.currentUser = user1;
                UserService.setCurrentUser(user1);
                $location.url("/profile");
            }
        }
    }
})();