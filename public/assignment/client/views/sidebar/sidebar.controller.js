/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController(UserService, $location) {
        var vm = this;

        function init(){
            vm.$location = $location;
        }
        init();

    }
})();