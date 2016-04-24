/**
 * Created by akash on 4/17/16.
 */
"use strict";
(function(){
    angular
        .module("MedicalTourismApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, ReviewService, QuoteService, $location){
        var vm = this;


        function init(){
            var usr = UserService.getCurrentUser();
            vm.currentUser = usr;
            vm.changePassword = false;
            if(usr) {
                UserService
                    .findUserById(usr._id)
                    .then(
                        function(response){
                            vm.currentUser = response.data;
                        },
                        function(err){
                            console.log(err);
                        }
                    );
            } else {
                $location.url("/home");
            }

            getReviews(usr);
            getQuote(usr);
            getAllQuoteRequest();
        }
        init();

        vm.updateUser = updateUser;
        vm.updateQuote = updateQuote;
        vm.getReviews = getReviews;

        function updateUser(user){
            if(!vm.changePassword){
                delete user.password;
            }
            UserService
                .updateUser(user._id, user)
                .then(
                    function(response){
                        var updatedUser = response.data;
                        if(updatedUser){
                            vm.message = "Update Successfully";
                            UserService
                                .setCurrentUser(updatedUser);
                            init();
                        } else {
                            vm.message = "Update failed";
                        }
                    },
                    function(err){
                        console.log("err");
                    }
                );
        }

        function updateQuote(qmessage, username){
            QuoteService
                .updateQuote(username, qmessage)
                .then(
                    function(response){
                        var updatedQuote = response.data;
                        if(updatedQuote){
                            vm.message = "Quote Sent Successfully";
                        } else {
                            vm.umessage = "Quote Failed";
                        }
                    },
                    function(err){
                        console.log("err");
                    }
                );
        }

        function getReviews(user){
            ReviewService
                .findAllReviewsForUser(user._id)
                .then(function(response){
                    var data = response.data;
                    if(data){
                        vm.reviews = data;
                    } else {
                        vm.msg = "You have no reviews";
                    }
                },
                function(err){
                    console.log("err");
                });
        }

        function getQuote(user){
            QuoteService
                .getQuoteForUser(user._id)
                .then(function(response){
                    var data = response.data;
                    if(data){
                        vm.quote = data;
                    } else {
                        vm.qmsg = "We are working on your quote"
                    }
                },
                function(err){
                    console.log(err);
                });
        }

        function getAllQuoteRequest(){
            QuoteService
                .getAllQuotes()
                .then(function(response){
                    var data = response.data;
                    if(data){
                        vm.quotes = data;
                    } else {
                        vm.aqmsg = "No Quote Requests from User";
                    }
                },
                function(err){
                    console.log("err");
                });
        }
    }
})();