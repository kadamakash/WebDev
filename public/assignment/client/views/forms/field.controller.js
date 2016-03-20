/**
 * Created by akash on 3/18/16.
 */
"use strict";
(function () {
    angular
        .module('FormBuilderApp')
        .controller('ModalInstance', function ($scope, $uibModalInstance, editField, popupHeader) {

            $scope.editField = editField;
            $scope.popupHeader = popupHeader;
            if(editField.options) {

                console.log(editField.options);
                var fromattedOptions = null;
                for (var index = 0; index< editField.options.length; index++) {
                    console.log(editField.options[index]);
                    var option = editField.options[index];
                    if (fromattedOptions) {

                        fromattedOptions = fromattedOptions + "\n" + option.value + ":" + option.label;
                    } else {

                        fromattedOptions = option.value + ":" + option.label;
                    }
                }

                $scope.editField.placeholder = fromattedOptions;
            }
            $scope.submit = function(updatedOptions) {
                var temp = updatedOptions.placeholder.split('\n');
                var newOptions = [];
                for(var index =0;index<temp.length;index++) {
                    var tempString = temp[index];
                    newOptions.push({
                        value: tempString.split(':')[0],
                        label: tempString.split(':')[1]
                    })
                }
                updatedOptions.options = newOptions;
                $uibModalInstance.close(updatedOptions);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss();
            };
        });


    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController($scope, $location, UserService, FormService, $routeParams, FieldService, $uibModal) {

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


        $scope.open = function (fieldType, field) {

            var modalInstance = null;
            var currentLabel = field.label,
                currentPlaceholder = field.placeholder;

            switch (fieldType) {
                case 'TEXT':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelPlaceholder.html',
                        controller: 'ModalInstance',
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Single Line Field'
                            },
                            editField: field
                        }
                    });
                    break;
                case 'EMAIL':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelPlaceholder.html',
                        controller: 'ModalInstance',
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Email Field'
                            },
                            editField: field
                        }
                    });
                    break;
                case 'TEXTAREA':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelPlaceholder.html',
                        controller: 'ModalInstance',
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Multiple Lines Field'
                            },
                            editField: field
                        }
                    });
                    break;
                case 'DATE':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelPlaceholderDate.html',
                        controller: 'ModalInstance',
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Date Field'
                            },
                            editField: field
                        }
                    });
                    break;
                case 'OPTIONS':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelOptions.html',
                        controller: 'ModalInstance',
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Dropdown Field'
                            },
                            editField: field
                        }
                    });
                    break;
                case 'CHECKBOXES':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelOptions.html',
                        controller: 'ModalInstance',
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Checkbox Field'
                            },
                            editField: field
                        }
                    });
                    break;
                case 'RADIOS':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelOptions.html',
                        controller: 'ModalInstance',
                        size: 'sm',
                        resolve: {
                            popupHeader: function() {
                                return 'Radio Button Field'
                            },
                            editField: field
                        }
                    });
                    break;
                default:
                    break;
            }

            modalInstance.result.then(function (model) {
                field.label = model.label;
                field.placeholder = model.placeholder;
                FieldService.updateFields(formId, $scope.fields);
                console.log(field);
            }, function () {
                field.label = currentLabel;
                field.placeholder = currentPlaceholder;
                console.log("Cancel Pressed");
            });

        };

        //Event handler declarations
        $scope.addField = addField;
        $scope.removeField = removeField;
        $scope.updateModelOnSort = updateModelOnSort;

        //Event handler implementation
        function addField(fieldType) {
            if(fieldType) {
                switch(fieldType) {
                    case "Single Line Text Field":
                        FieldService.createFieldForForm(formId,{"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"})
                            .then(function(res) {
                                $scope.fields = res.data.fields;
                            });

                        break;
                    case "Multi Line Text Field":
                        FieldService.createFieldForForm(formId,{"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"})
                            .then(function(res) {
                                $scope.fields = res.data.fields;
                            });
                        break;
                    case "Date Field":
                        FieldService.createFieldForForm(formId,{"_id": null, "label": "New Date Field", "type": "DATE"})
                            .then(function(res) {
                                $scope.fields = res.data.fields;
                            });
                        break;
                    case "Checkboxes Field":
                        FieldService.createFieldForForm(formId,{"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                                {"label": "Option A", "value": "OPTION_A"},
                                {"label": "Option B", "value": "OPTION_B"},
                                {"label": "Option C", "value": "OPTION_C"}
                            ]})
                            .then(function(res) {
                                $scope.fields = res.data.fields;
                            });
                        break;

                    case "Dropdown Field":
                        FieldService.createFieldForForm(formId,{"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                                {"label": "Option 1", "value": "OPTION_1"},
                                {"label": "Option 2", "value": "OPTION_2"},
                                {"label": "Option 3", "value": "OPTION_3"}
                            ]})
                            .then(function(res) {
                                $scope.fields = res.data.fields;
                            });
                        break;
                    case "Radio Buttons Field":
                        FieldService.createFieldForForm(formId,{"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                                {"label": "Option X", "value": "OPTION_X"},
                                {"label": "Option Y", "value": "OPTION_Y"},
                                {"label": "Option Z", "value": "OPTION_Z"}
                            ]})
                            .then(function(res) {
                                console.log(res.data.fields);
                                $scope.fields = res.data.fields;
                            });
                        break;
                    default:
                        break;
                }
            }

        }

        function removeField(field) {
            console.log("remove"+field._id);
            FieldService.deleteFieldFromForm(formId,field._id)
                .then(function(res) {
                    $scope.fields = res.data.fields;
                })
        }

        function updateModelOnSort() {
            FieldService.updateFields(formId, $scope.fields);
        }

        //callbacks
        function fieldsForFormCallback(fields) {
            $scope.fields = fields.data;
            console.log(fields);
        }
    }


})();