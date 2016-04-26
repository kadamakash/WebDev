/**
 * Created by akash on 4/15/16.
 */
"use strict";
(function (){
    angular
        .module("MedicalTourismApp")
        .controller("HomeController", HomeController);

    function HomeController(UserService){
        var vm = this;
        var user = UserService.getCurrentUser();
    }


})();