//angular
(function() {
	var sliderLoaded = false;
	var app = angular.module('slider', []);
	app.controller('SliderController', function() {
		this.slidervalues = function(){
			if(sliderLoaded)
			{
				return $("#slider").slider("values");
			}
			else
			{
				return "loading...";
			}
		};
	});
	var globalslidervals = [];
	app.directive('wtwSlider', function() {
		return {
			restrict: 'A',//only seems to work as an attribute
			link: function(scope, element, attrs) {
				//apply the jquery UI Slider widget to the passed info
				$(element).slider({
					animate: true,
					values: [10, 20, 30, 80],
					slide: function(event, slider) {
						//$("#valuesoutput").text($("#slider").slider("values"));
					},
					create:function(){//hide loader
						$(this).find(".slider-loader").remove();
						sliderLoaded = true;						
					}
				});
			}
		};
	});
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