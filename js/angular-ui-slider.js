/*
 jQuery UI Slider plugin wrapper
*/
(function() {
	var app = angular.module('ui.slider', []);
	app.value('uiSliderConfig', {});
	app.directive('uiSlider', ['uiSliderConfig', '$timeout',
		function(uiSliderConfig, $timeout) {
			uiSliderConfig = uiSliderConfig || {};
			return {
				require: 'ngModel',
				link: function(scope, elm, attrs, ngModel) {

						function parseNumber(n, decimals) {
							return (decimals) ? parseFloat(n) : parseInt(n);
						};

						var options = angular.extend(scope.$eval(attrs.uiSlider) || {}, uiSliderConfig);
						// Object holding range values
						var prevRangeValues = {
							min: null,
							max: null
						};

						// convenience properties
						var properties = ['min', 'max', 'step'];
						var useDecimals = (!angular.isUndefined(attrs.useDecimals)) ? true : false;

						var init = function() {
							// When ngModel is assigned an array of values then range is expected to be true.
							// Warn user and change range to true else an error occurs when trying to drag handle
							//max: dont want this happening unless explicitly added
/* 							if (angular.isArray(ngModel.$viewValue) && options.range !== true) {
								console.warn('Change your range option of ui-slider. When assigning ngModel an array of values then the range option should be set to true.');
								options.range = true;
							} */

							// Ensure the convenience properties are passed as options if they're defined
							// This avoids init ordering issues where the slider's initial state (eg handle
							// position) is calculated using widget defaults
							// Note the properties take precedence over any duplicates in options
							angular.forEach(properties, function(property) {
								if (angular.isDefined(attrs[property])) {
									options[property] = parseNumber(attrs[property], useDecimals);
								}
							});
							//manually add create option
							options.create = removeLoaders;

							//Calls the actual JQuery UI Slider widget
							//setup the slider and all, with intiated options
							elm.slider(options);
							
							//update the model for the first time 
							ngModel.$setViewValue(elm.slider("values") || elm.slider("values"));
							
							init = angular.noop;
						};

						// Find out if decimals are to be used for slider
						angular.forEach(properties, function(property) {
							// support {{}} and watch for updates
							attrs.$observe(property, function(newVal) {
								if ( !! newVal) {
									init();
									elm.slider('option', property, parseNumber(newVal, useDecimals));
									ngModel.$render();
								}
							});
						});
						attrs.$observe('disabled', function(newVal) {
							init();
							elm.slider('option', 'disabled', !! newVal);
						});

						// Watch ui-slider (byVal) for changes and update
						scope.$watch(attrs.uiSlider, function(newVal) {
							init();
							if (newVal != undefined) {
								elm.slider('option', newVal);
							}
						}, true);

						// Late-bind to prevent compiler clobbering
						$timeout(init, 0, true);

						// Update model value from slider
						elm.bind('slide', function(event, ui) {
							ngModel.$setViewValue(ui.values || ui.value);
							scope.$apply();
						});
						
						// Update slider from model value, when it is changed (but only when changed by user?)
						ngModel.$render = function() {
							init();
							//check if it handles arrays of values or not
							var method = (options.range === true || options.multi === true)? 'values' : 'value';
							//get the current number of handles/sliders
							var prevcount = angular.isArray(elm.slider('values'))? elm.slider('values').length:1;
							var newcount = angular.isArray(ngModel.$modelValue)?ngModel.$modelValue.length:1;
							if (newcount > prevcount){
								elm.slider('addHandle',70);
								ngModel.$setViewValue(elm.slider('values'));
							}
							
							//check for bad values
							if (!(options.range === true || options.multi === true) && isNaN(ngModel.$viewValue) && !(ngModel.$viewValue instanceof Array)) {
								ngModel.$viewValue = 0;
							} else if ((options.range || options.multi) && !angular.isDefined(ngModel.$viewValue)) {
								ngModel.$viewValue = [0, 0];
							}

							// Do some sanity check of range values
							if (options.range === true) {

								// Check outer bounds for min and max values
								if (angular.isDefined(options.min) && options.min > ngModel.$viewValue[0]) {
									ngModel.$viewValue[0] = options.min;
								}
								if (angular.isDefined(options.max) && options.max < ngModel.$viewValue[1]) {
									ngModel.$viewValue[1] = options.max;
								}

								// Check min and max range values
								if (ngModel.$viewValue[0] > ngModel.$viewValue[1]) {
									// Min value should be less to equal to max value
									if (prevRangeValues.min >= ngModel.$viewValue[1])
										ngModel.$viewValue[0] = prevRangeValues.min;
									// Max value should be less to equal to min value
									if (prevRangeValues.max <= ngModel.$viewValue[0])
										ngModel.$viewValue[1] = prevRangeValues.max;
								}

								// Store values for later user
								prevRangeValues.min = ngModel.$viewValue[0];
								prevRangeValues.max = ngModel.$viewValue[1];

							}
							elm.slider(method, ngModel.$viewValue);
						};

						scope.$watch(attrs.ngModel, function() {
							if (options.range === true) {
								ngModel.$render();
							}
						}, true);

						function destroy() {
							elm.slider('destroy');
						}
						elm.bind('$destroy', destroy);
					},
				
			};
		}
	]);
})();