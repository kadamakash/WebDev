/**
 * Created by akash on 2/26/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService(){
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];

    var api = {
        createFormForUser:createFormForUser,
        updateFormById:updateFormById,
        findAllFormsForUser:findAllFormsForUser,
        deleteFormById:deleteFormById
    };

        return api;

        function createFormForUser(userId, form, callback) {
            var newForm = {
                _id: (new Date).getTime(),
                userId: userId,
                title: form.title
            };

            forms.push(newForm);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback) {
            var userForms = [];
            for(var index=0;index<forms.length;index++) {
                if(forms[index].userId == userId) {
                    userForms.push(forms[index]);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback) {
            for(var index=0;index<forms.length;index++) {
                if(forms[index]._id == formId) {
                    forms.splice(index,1);
                    break;
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            for(var index=0;index<forms.length;index++) {
                if(forms[index]._id == formId) {
                    forms[index]._id = formId;
                    newForm._id = formId;
                    forms[index].title = newForm.title;
                    forms[index].userId = newForm.userId;
                    break;
                }
            }
            callback(newForm);
        }

    }

})();