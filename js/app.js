//angular
(function() {
	var app = angular.module('slider', []);
	app.controller('SliderController', function() {
		//bool for checking if the slider is finished loading 
		this.sliderLoaded = false;
		//the array of values of the slider
		this.sliderVals = [];
		
		//array of clothing
		this.articles = [{name:"jacket",id:0},{name:"shirt",id:1},{name:"tank",id:2}];
		//a Jquery'd handle for the slider element in the 
		this.sliderEm = null;
		this.updateVals = function() {
			if (this.sliderLoaded) {
				this.sliderVals = this.sliderEm.slider("values");
				//$scope.$apply();
			} else {
				this.sliderVals = "loading...";
			}
		};
		this.addSlider = function() {
			$("#slider").slider("addHandle", 50);
			this.updateVals();
		};

		this.removeSlider = function() {
			$("#slider").slider("removeHandle");
			this.updateVals();
		};
	});
	app.directive('wtwSlider', function() {
		return {
			restrict: 'A', //only seems to work as an attribute
			link: function(scope, element, attrs) {
				//apply the jquery UI Slider widget to the passed info
				var initialvals = [];
				try {//try to parse the value and see if its an okay array
					initialvals = JSON.parse(attrs.wtwSlider);
				} catch (err) {}
				if (initialvals.length === 0) {
					//default val
					vals = [10, 20, 30, 80];
				}
				$(element).slider({
					animate: true,
					values: initialvals,
					slide: function(event, slider) {
						scope.tempslider.sliderVals = $(this).slider("values");
						//scope.tempslider.updateVals();
						scope.$apply();
					},
					create: function() { //hide loader
						$(this).find(".slider-loader").remove();
						scope.tempslider.sliderLoaded = true;
						scope.tempslider.sliderVals = $(this).slider("values");
					}
				});

				scope.tempslider.sliderEm = $(element);
			}
		};
	});
})(); //end javascript wrapping 

/* 
$("#btn-remove").click(function() {
	$("#slider").slider("removeHandle");
}); */