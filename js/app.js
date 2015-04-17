//angular
(function() {
	var app = angular.module('slider', []);
	app.controller('SliderController', function() {
		this.sliderLoaded = false;
		this.vals = [];
		this.updateVals = function(){
			if(this.sliderLoaded)
			{
				this.vals = $("#slider").slider("values");
			}
			else
			{
				this.vals = "loading...";
			}
		};
	});
	app.directive('wtwSlider', function() {
		return {
			restrict: 'A',//only seems to work as an attribute
			link: function(scope, element, attrs) {
				//apply the jquery UI Slider widget to the passed info
				var vals = [];
				vals = JSON.parse(attrs.wtwSlider);
				if (vals.length === 0)
				{
					//default val
					vals= [10, 20, 30, 80];
				}
				$(element).slider({
					animate: true,
					values: vals,
					slide: function(event, slider) {
						//scope.tempslider.vals = $(this).slider("values");
						//scope.tempslider.updateVals();
						//scope.$apply();
					},
					create:function(){//hide loader
						$(this).find(".slider-loader").remove();
						scope.tempslider.sliderLoaded = true;	
						scope.tempslider.vals = $(this).slider("values");
					}
				});
			}
		};
	});
})(); //end javascript wrapping 


//$("#slider")
$("#btn-add").click(function() {
	$("#slider").slider("addHandle", 70);
	$("#slider").slider("refresh");
});

$("#btn-remove").click(function() {
	$("#slider").slider("removeHandle");
});