/**
 * Created by akash on 2/26/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider)
        {
        $routeProvider
            .when("/", {
                redirectTo: "/home"
            })
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html"
            })
            .when("/form-fields", {
                templateUrl: "views/forms/form-fields.view.html"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    });
})();