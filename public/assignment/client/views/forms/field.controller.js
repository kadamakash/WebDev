/**
 * Created by akash on 3/18/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    angular
        .module('FormBuilderApp')
        .controller('ModalInstance', function ($uibModalInstance, editField, popupHeader) {

            var vm = this;
            vm.popupHeader = popupHeader;
            vm.editField = editField;

            if(editField.options) {

                console.log(editField.options);
                var fromattedOptions = null;
                _.forEach(editField.options, function(option){
                    if (fromattedOptions) {

                        fromattedOptions = fromattedOptions + "\n" + option.value + ":" + option.label;
                    } else {

                        fromattedOptions = option.value + ":" + option.label;
                    }
                });

                vm.editField.placeholder = fromattedOptions;
            }
            $scope.submit = function(editField) {
                var temp = editField.placeholder.split('\n');
                var newOptions = [];
                _.forEach(temp, function(string){
                    newOptions.push({
                        value: tempString.split(':')[0],
                        label: tempString.split(':')[1]
                    })

                });
                editField.options = newOptions;
                $uibModalInstance.close(updatedOptions);
            };

            vm.cancel = function() {
                $uibModalInstance.dismiss();
            };
        });




    function FieldController($location, UserService, FormService, $routeParams, FieldService, $uibModal) {

        //currently logged in user
        var currentUser = UserService.getCurrentUser();

        var formId = $routeParams.formId;
        function init() {
            FieldService.getFieldsForForm(formId)
                .then(function successCallback(response){
                    vm.fields = response.data;
                });
            console.log(formId);
        }
        init();

        //Event handler declarations
        vm.addField = addField;
        vm.removeField = removeField;
        vm.updateModelOnSort = updateModelOnSort;

        /*$scope.$location = $location;
        $scope.model = {
            fieldType: null,
            availableOptions: [{id: '1', name: 'Single Line Text Field'},
                {id: '2', name: 'Multi Line Text Field'},
                {id: '3', name: 'Date Field'},
                {id: '4', name: 'Checkboxes Field'},
                {id: '5', name: 'Dropdown Field'},
                {id: '6', name: 'Radio Buttons Field'}]
        };*/


        vm.open = function (fieldType, field) {

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
                FieldService.updateFields(formId, vm.fields);
                console.log(field);
            }, function () {
                field.label = currentLabel;
                field.placeholder = currentPlaceholder;
                console.log("Cancel Pressed");
            });

        };



        //Event handler implementation
        function addField(fieldType) {
            if(fieldType) {
                switch(fieldType) {
                    case 'Single Line Text Field':
                        FieldService.createFieldForForm(formId,{"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"})
                            .then(function(res) {
                                vm.fields = res.data.fields;
                            });

                        break;
                    case "Multi Line Text Field":
                        FieldService.createFieldForForm(formId,{"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"})
                            .then(function(res) {
                                vm.fields = res.data.fields;
                            });
                        break;
                    case "Date Field":
                        FieldService.createFieldForForm(formId,{"_id": null, "label": "New Date Field", "type": "DATE"})
                            .then(function(res) {
                                vm.fields = res.data.fields;
                            });
                        break;
                    case "Checkboxes Field":
                        FieldService.createFieldForForm(formId,{"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                                {"label": "Option A", "value": "OPTION_A"},
                                {"label": "Option B", "value": "OPTION_B"},
                                {"label": "Option C", "value": "OPTION_C"}
                            ]})
                            .then(function(res) {
                                vm.fields = res.data.fields;
                            });
                        break;

                    case "Dropdown Field":
                        FieldService.createFieldForForm(formId,{"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                                {"label": "Option 1", "value": "OPTION_1"},
                                {"label": "Option 2", "value": "OPTION_2"},
                                {"label": "Option 3", "value": "OPTION_3"}
                            ]})
                            .then(function(res) {
                                vm.fields = res.data.fields;
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
                                vm.fields = res.data.fields;
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
                    vm.fields = res.data.fields;
                })
        }

        function updateModelOnSort() {
            FieldService.updateFields(formId, vm.fields);
        }

        //callbacks
        /*function fieldsForFormCallback(fields) {
            $scope.fields = fields.data;
            console.log(fields);
        }*/
    }


})();