/**
 * Created by akash on 4/15/16.
 */
"use strict";
(function () {

    angular
        .module("MedicalTourismApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService) {

        var vm = this;
        vm.logout = logout;
        vm.search = search;

        function init(){
            vm.$location = $location;
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(function(response){
                        UserService.setCurrentUser(null);
                        $location.url("/home");
                    },
                    function(err){
                        console.log(err);
                    });
        }

        function search(name){
            vm.searchtxt = null;
            vm.isCollapsed = !vm.isCollapsed;
            if(name) {
                $location.url('/hospital' + name);
            } else {
                $location.url('/hospital');
            }
        }
    }

})();