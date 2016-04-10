/**
 * Created by akash on 3/19/16.
 */
(function(){
    angular
        .module('myDirective', [])
        .directive("mySortable", mySortable);

    function mySortable() {
        var start = null;
        var end = null;
        function link(scope, element, attributes) {
            var myAxis = attributes.dmAxis;
            $(element)
                .sortable({
                    handle: '.handle',
                    axis: "y",
                    sort: function(event, ui) {
                        start = ui.item.index();
                        console.log(ui.item);
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    console.log(ui.item);
                    if(start >= end){
                        start--;
                    }
                    scope.model.sortFields(start, end);
                }
            });
        }

        return {
            link: link
        }
    }
})();