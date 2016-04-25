/**
 * Created by akash on 4/24/16.
 */
"use strict";
(function() {
    angular
        .module("MedicalTourismApp")
        .controller("ApartmentController",ApartmentController);

    function ApartmentController(ApartmentService) {

        //Declarations
        var vm = this;

        vm.searchHotel = searchHotel;


        //Implementations
        function searchHotel(code) {
            ApartmentService
                .findApartmentsByCity(code,
                    function(response){
                        vm.hotels = response;
                        console.log(response);
                      /*  if(response && response.length > 0){
                            vm.hotels = response;
                            console.log(response);
                        } else {
                            console.log(response);
                            vm.message = "No Hotels found for this city"
                        }
*/
                });
        }

    }
})();