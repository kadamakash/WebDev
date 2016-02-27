/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController)

    function FormController($scope, $location, $rootScope, UserService, FormService) {

        //currently logged in user
        var currentUser = UserService.getCurrentUser();
        $scope.$location = $location;

        //Event handler declarations
        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;

        //Fetching all forms for current user to display
        function init() {
            FormService.findAllFormsForUser(currentUser._id, findAllFormsForUserCallback);
        }
        init();

        //Event handler implementations
        function addForm(form) {
            form.userId = currentUser._id;
            form._id = (new Date()).getTime();
            FormService.createFormForUser(currentUser._id,form,addFormCallback);
            $scope.form = null;
        }

        function deleteForm(index) {
            var formId = $scope.forms[index]._id;
            FormService.deleteFormById(formId,deleteFormCallback)

        }

        function selectForm(index) {

            $scope.selectedRow = index;
            $scope.form = {
                _id: $scope.forms[index]._id,
                title: $scope.forms[index].title,
                userId: $scope.forms[index].userId
            };

        }

        function updateForm(form) {
            FormService.updateFormById(form._id,form,updateFormCallback);
            $scope.form = null;
        }

        //callback functions
        function findAllFormsForUserCallback(formsCurrentUser) {
            $scope.forms = formsCurrentUser;

        }

        function addFormCallback(form) {
            init();
        }

        function deleteFormCallback(forms) {
            init();
        }

        function updateFormCallback(form) {
            init();
        }

    }

})();