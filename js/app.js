
var slider_module = angular.module("slider_module", []);

//SLider Controller
slider_module.controller("imgslider_ctlr", ["$scope", "slider_service",
	function ($scope, slider_service) {
		slider_service.myfunc(function (r) {
			$scope.imglists = r;
		});
		$scope.slidecount = function () {
			return $('#slider .item').length;
		}

	}]);

//Slider Service
slider_module.service("slider_service", function ($http) {

	this.myfunc = function (cb) {
		$http.get("myjson.json")
			.then(function (response) {
				cb(response.data);
			});
	}

});

//Slider Directive
slider_module.directive("sliderDirective", function ($timeout) {

	return {
		controller: function ($scope, $element, $attrs) {
			var slideindex = 0;
			angular.element($element[0].children[0]).css("display", "block");
			$scope.onSlide = function (k) {
                slideindex = slideindex + k;
				if (slideindex < 0) {
					slideindex = $element[0].children.length - 1;
                } else if (slideindex >= $element[0].children.length) {
					slideindex = 0;
                }
				for (var i = 0; i < $element[0].children.length; i++) {
                     angular.element($element[0].children[i]).css("display", "none");
                }
                     angular.element($element[0].children[slideindex]).css("display", "block");
            }

			//Code To Execute on Slide Nav Click
			$scope.onSlideNav = function (el,j) {
                     var slideindex=j;
					 //console.log("i am in on slide nav click",angular.element(el).css('border','1px solid gray'));
					 //angular.element(el);
					 //angular.element(el).css("border","2px solid black");
				for (var i = 0; i < $element[0].children.length; i++) {
                     angular.element($element[0].children[i]).css("display", "none");
                }
                     angular.element($element[0].children[slideindex]).css("display", "block");
            }
		}
	}

});

