/**
 * Created by akash on 3/18/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($scope, $location, UserService, FormService,$routeParams, FieldService) {

        //currently logged in user
        var currentUser = UserService.getCurrentUser();
        var formId = $routeParams.formId;
        function init() {
            FieldService.getFieldsForForm(formId)
                .then(fieldsForFormCallback);
        }
        init();

        $scope.$location = $location;
        $scope.model = {
            fieldType: null,
            availableOptions: [{id: '1', name: 'Single Line Text Field'},
                {id: '2', name: 'Multi Line Text Field'},
                {id: '3', name: 'Date Field'},
                {id: '4', name: 'Checkboxes Field'},
                {id: '5', name: 'Dropdown Field'},
                {id: '6', name: 'Radio Buttons Field'}]
        };

        //Event handler declarations
        $scope.addField=addField;
        $scope.removeField = removeField;

        //Event handler implementation
        function addField(fieldType) {
            if(fieldType) {
                console.log(fieldType);
            }

        }

        function removeField(field) {
            console.log("remove"+field._id);
        }

        //callbacks
        function fieldsForFormCallback(fields) {
            $scope.fields = fields.data;
            console.log(fields);
        }
    }


})();