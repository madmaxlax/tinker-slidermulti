//angular
(function() {
	var app = angular.module('slider', ['ui.slider']);
	app.factory('removeLoaders', function() {
		$(this).find(".slider-loader").remove();
	});

})(); //end javascript wrapping 

function removeLoaders()
{
	$(this).parent().find(".slider-loader").remove();
}

var sliderVar;

//$("#slider")
$("#btn-add").click(function() {
	$("#slider").slider("addHandle", 70);
	$("#slider").slider("refresh");

});

$("#btn-remove").click(function() {
	$("#slider").slider("removeHandle");
});