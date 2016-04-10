/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($location, UserService, FormService) {

        var vm = this;

        vm.$location = $location;

        //Event handler declarations
        vm.addForm = addForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.updateForm = updateForm;
        vm.unselectForm = unselectForm;
        vm.setForms = setForms;
        vm.selectedForm = null;


        //Fetching all forms for current user to display
        function init() {
            vm.currentUser = UserService.getCurrentUser();
            FormService
                .findAllFormsForUser(vm.currentUser._id)
                .then(function(response){
                    setForms(response.data);
                    vm.$location = $location;
                });
        }
        init();

        function setForms(forms){
            vm.forms = forms;
            vm.form = null;
            vm.selectedForm = false;
            vm.message = null;
        }


        function addForm(form) {
            if(!form || !form.title){
                vm.message = "Please specify a valid name of the form.";
            }else{
                var newForm = {
                    title: form.title
                };
                FormService
                    .createFormForUser(vm.currentUser._id, newForm)
                    .then(init);
            }
        }


        function deleteForm(form) {
            FormService
                .deleteFormById(form._id)
                .then(init);
        }


        function selectForm(form) {
            vm.form = {
                _id: form._id,
                title: form.title
            };
            vm.selectedForm = true;
        }


        function updateForm(form) {
            if(!form || !form.title){
                vm.message = "Please specify a valid name of the form.";
            }else {
                var updatedForm = {
                    title: form.title
                };

                FormService.updateFormById(form._id, updatedForm)
                    .then(init);
            }
        }


        function unselectForm(){
            vm.form = null;
            vm.selectedForm = null;
        }
    }

})();