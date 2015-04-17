//angular

var removeLoaders = function()
{
	$(this).parent().find(".slider-loader").remove();
};

(function() {
	var app = angular.module('slider', ['ui.slider']);
	app.controller("sliderController", function(){
		this.vals = [10,80,90];
		this.addHandle = function(newhandleval){
			this.vals.push(newhandleval);
		};
		
	});
/* 	app.factory('removeLoaders', function() {
		$(this).find(".slider-loader").remove();
	}); */

})(); //end javascript wrapping 


var sliderVar;

//$("#slider")
$("#btn-add").click(function() {
	$("#slider").slider("addHandle", 70);
	$("#slider").slider("refresh");

});

$("#btn-remove").click(function() {
	$("#slider").slider("removeHandle");
});