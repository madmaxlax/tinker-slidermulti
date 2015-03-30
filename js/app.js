var sliderVar;

$("#slider").slider({
	animate: true,
	values: [10, 20, 30, 80],
	slide: function(event, slider) {
		$("#valuesoutput").text(slider.values.toString());
	}
});
$("#btn-add").click(function() {
	$("#slider").slider("addHandle",70);
	$("#slider").slider("refresh");

});

$("#btn-remove").click(function() {
	$("#slider").slider("removeHandle");
});

//angular
