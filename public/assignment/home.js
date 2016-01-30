/**
 * Created by akash on 1/29/16.
 */
$(".deleterow").on("click", function(){
    var $killrow = $(this).parent('tr');
    $killrow.addClass("danger");
    $killrow.fadeOut(2000, function(){
        $(this).remove();
    });});


$(".editrow").on("click", function(){
    $('table tr:last').after("<tr><td data-qid='X'><span>NEW</span></td><td><span>NEW</span></td><td><span>NEW</span></td><td><span>NEW</span></td><td><span>NEW</span></td><td class='deleterow'><div class='glyphicon glyphicon-remove'></div></td></tr>");
});

