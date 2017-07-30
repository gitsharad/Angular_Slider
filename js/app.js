
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
			$scope.slideindex = 0;
			angular.element($element[0].children[0]).css("display", "block");
			$scope.onSlide = function (k) {
                $scope.slideindex = $scope.slideindex + k;
				if ($scope.slideindex < 0) {
					$scope.slideindex = $element[0].children.length - 1;
                } else if ($scope.slideindex >= $element[0].children.length) {
					$scope.slideindex = 0;
                }
				for (var i = 0; i < $element[0].children.length; i++) {
                     angular.element($element[0].children[i]).css("display", "none");
                }
                     angular.element($element[0].children[$scope.slideindex]).css("display", "block");
            }

			//Code To Execute on Slide Nav Click
			$scope.onSlideNav = function (el,j) {
                    $scope.slideindex=j;
					for (var i = 0; i < $element[0].children.length; i++) {
                     angular.element($element[0].children[i]).css("display", "none");
					}
                     angular.element($element[0].children[$scope.slideindex]).css("display", "block");
					 
            } 
		}
	}

});

