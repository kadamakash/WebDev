/**
 * Created by akash on 4/20/16.
 */
"use strict";
(function(){
    angular
        .module("MedicalTourismApp")
        .controller("QuoteController", QuoteController);

    function QuoteController(QuoteService, UserService, $location){
        var vm = this;
        vm.user = null;

        function init(){
            var usr = UserService.getCurrentUser();
            if(usr){
                UserService
                    .findUserById(usr._id)
                    .then(
                        function(response){
                            vm.currentUser = response.data;
                            console.log(vm.currentUser);
                        },
                        function(err){
                            console.log(err);
                        }
                    );
            } else {
                $location.url("/home");
            }
        }
        init();

        vm.sendQuote = sendQuote;


        function sendQuote(quote){
            vm.message = null;
            if(!quote){
                vm.message = "Please fill all the required fields";
                return;
            }
            if(!quote.firstName){
                vm.message = "Please provide your First Name";
                return;
            }
            if(!quote.lastName){
                vm.message = "Please provide your Last Name";
                return;
            }
            if(!quote.gender){
                vm.message = "Please provide your Gender";
                return;
            }
            if(!quote.age){
                vm.message = "Please provide your Age";
                return;
            }
            if(!quote.email){
                vm.message = "Please provide your Email";
                return;
            }
            if(!quote.phone){
                vm.message = "Please provide your Phone";
                return;
            }
            if(!quote.city){
                vm.message = "Please provide your City";
                return;
            }
            if(!quote.state){
                vm.message = "Please provide your State";
                return;
            }
            if(!quote.country){
                vm.message = "Please provide your Country";
                return;
            }

            var usr = UserService.getCurrentUser();
            var newQuote = {
                firstName: quote.firstName,
                lastName: quote.lastName,
                gender: quote.gender,
                age: quote.age,
                email: quote.email,
                phone: quote.phone,
                city: quote.city,
                state: quote.state,
                country: quote.country,
                message: quote.message,
                userId: usr
            };
            QuoteService
                .createQuote(newQuote)
                .then(
                    function(response){
                        if(response.data){
                            vm.message = "Quote Sent successfully. You can check your quote in profile page";
                        } else {
                            vm.error = "Please fill in the form and try submitting again"
                        }
                    }
                )
        }

    }
})();